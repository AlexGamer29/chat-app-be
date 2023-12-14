const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./');

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: '[Chat App] User image',
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
        public_id: (req, file) => {
            const nameWithoutExtension = file.originalname.replace(/\.[^/.]+$/, '');
            return nameWithoutExtension;
        }
    },
});

module.exports = storage;
