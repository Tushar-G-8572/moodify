const songModel = require('../models/song.model');
const storageService = require('../services/storage.service');
const id3 = require('node-id3');

async function uploadSongController(req,res) {
    const song = req.file.buffer
    const {mood} = req.body;
    const tags = id3.read(song);
    // console.log(tags);

    const [songFile, posterFile] = await Promise.all([
        storageService.uploadSong({
            buffer: song,
            filename: `${tags.title}.mp3`,
            folder: "moodify/songs"
        }),
        storageService.uploadSong({
            buffer: tags.image.imageBuffer,
            filename: `${tags.title}.jpeg`,
            folder: "moodify/posters"
        })
    ])

    const songData = await songModel.create({
        song_url:songFile.url,
        title:tags.title,
        poster:posterFile.url,
        mood
    })

    res.status(201).json({message:"Song uploaded",
        song:songData
    })

}

async function getSongController(req,res) {
    try{

        const {mood} = req.body
        
        const songsPlaylist = (mood === 'nuteral'? await songModel.find(): await songModel.find({mood}))
        
        res.status(200).json({message:"Playlist feteched",
            playlist:songsPlaylist
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Error while getting playlist"})
    }

}

module.exports = {uploadSongController,getSongController}