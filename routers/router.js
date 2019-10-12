const express = require('express');
const router = express.Router();
var paytm_config = require('../paytm/paytm_config').paytm_config;
var paytm_checksum = require('../paytm/checksum');
const CbInput = require('../models/cbInput');
const StartInput = require('../models/startInput');
const mongoose =require('mongoose')

router.post('/generate_checksum',(req,res)=>{
    try {
        var paramarray = req.body;
        paytm_checksum.genchecksum(paramarray, paytm_config.MERCHANT_KEY, function (err, checksum) {
            paramarray.CHECKSUMHASH = checksum;
            var startInput = new StartInput(paramarray);
            startInput.save((err,data)=>{
                console.log("data: ",data);
                
                if(!err){
                    res.render("firstTime",{
                        list:paramarray
                    })
                }else{
                    res.redirect('error')
                }
            })
        })
    } catch (error) {
        console.log("error : ",error);
        
    }

})

router.post("/cb",(req,res)=>{    
    res.render('cb',{
    list:req.body
})
    
})

router.post('/verify_checksum',(req,res)=>{
    var paytmChecksum = "";
    var paytmParams = {};
    let received_data = req.body;
    for (var key in received_data) {
        if (key == "CHECKSUMHASH") {
            paytmChecksum = received_data[key];
        } else {
            paytmParams[key] = received_data[key];
        }
    }
    var isValidChecksum = paytm_checksum.verifychecksum(paytmParams, paytm_config.MERCHANT_KEY, paytmChecksum);
    if(isValidChecksum) {
        const cbInput = new CbInput(req.body);
        cbInput.save((err,data)=>{
            console.log(data)
            if(!err){
                res.render('success',{
                    doc:data
                }) 
            }else{
                res.send(err)
            }
        })
    } else {
        console.log("Checksum Mismatched");
        res.send('Payment Failed')
    }
    
})


module.exports = router;