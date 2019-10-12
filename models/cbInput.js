const mongoose = require('mongoose');

const cbInputSchema = new mongoose.Schema({
    CURRENCY:{
        type:String
    },
    GATEWAYNAME:{
        type:String
    },
    RESPMSG:{
        type:String
    },
    BANKNAME:{
        type:String
    },
    PAYMENTMODE:{
        type:String
    },
    MID:{
        type:String
    },
    RESPCODE:{
        type:String
    },
    TXNID:{
        type:String
    },
    TXNAMOUNT:{
        type:Number
    },
    ORDERID:{
        type:String
    },
    STATUS:{
        type:String
    },
    BANKTXNID:{
        type:Number
    },
    TXNDATE:{
        type:String
    },
    CHECKSUMHASH:{
        type:String
    }

})

const cbInput = mongoose.model('cbInput',cbInputSchema);
module.exports = cbInput;