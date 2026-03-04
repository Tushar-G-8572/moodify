const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    song_url:{
        type:String,
        required:true
    },
    poster:{
        type:String,
        required:true
    },
    mood:{
        type:String,
        enum:{
            values:["happy","sad","surprised","nuteral"],
            message:"mood should be happy,sad,surprised or nuteral "
        },
        required:true,
        index:true
    },
    title:{
        type:String,
        required:true
    }
})

const songModel = mongoose.model('song',songSchema);

module.exports = songModel;