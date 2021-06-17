var cloudinary = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')

cloudinary.config({
    cloud_name:"dvdwwxoju",
    api_key: "666432229823685",
    api_secret: "qC0yoznAKY_wLJ_4n5yZ99IboME"
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'samples',
        allowed_formats: async (req, file) => "jpg,png"
    }
})

const uploadCloud = multer({ storage: storage });

module.exports = uploadCloud