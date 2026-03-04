const ImageKit = require('@imagekit/nodejs')

const imageKitClient = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function uploadSong({buffer,filename,folder=""}) {
    const responce = await imageKitClient.files.upload({
        file:await ImageKit.toFile(Buffer.from(buffer)),
        fileName:filename,
        folder
    });
    return responce;
}

module.exports = {uploadSong};

