const mongoose = require('mongoose');
//it will take from index.html form
const startInputSchema = new mongoose.Schema({
    MID:{
        type:String
    },
    ORDER_ID:{
        type:String
    },
    CUST_ID:{
        type:String
    },
    INDUSTRY_TYPE_ID:{
        type:String
    },
    CHANNEL_ID:{
        type:String
    },
    TXN_AMOUNT:{
        type:Number
    },
    WEBSITE:{
        type:String
    },
    CHECKSUMHASH:{
        type:String
    },
    CALLBACK_URL:{
        type:String
    },
    EMAIL:{
        type:String
    },
    MOBILE_NO:{
        type:Number
    }
})

const startInput = mongoose.model('startInput',startInputSchema);
module.exports = startInput;