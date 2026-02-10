const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../../connection/cloud_config');

const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder: 'StackSteps',
        allowed_formats: ['jpg', 'jpeg', 'png']
    }
});

module.exports = multer({ storage });