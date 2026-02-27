const mongoose = require('mongoose');

const blackListTokenSchema = new mongoose.Schema({
    token:{
        type:String,
        required:[true,"Black list token required after logout"]
    },
    expiresAt:{
        type:Date,
        required:true
    }
},{
    timestamps:true
})

blackListTokenSchema.index({expiresAt:"1"},{expireAfterSeconds:"0"});

const blackListTokenModel = mongoose.model('black-list',blackListTokenSchema);

module.exports = blackListTokenModel;