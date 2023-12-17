const multer = require('multer');
const storage = require('../../config/cloudinary/storage');
const upload = multer({ storage });
const cloudinary = require('../../config/cloudinary')

// Middleware for handling file upload with multer
const handleFileUpload = (req, res, next) => {
    upload.single("profile_photo")(req, res, (err) => {
        if (err) {
            return res.status(400).send({
                status: 400,
                data: { message: "Error uploading profile photo" },
            });
        }
        next();
    });
};

// Middleware for uploading the file to Cloudinary
const uploadToCloudinary = async (req, res, next) => {
    try {
        if (req.file) {
            const cloudinaryResponse = await cloudinary.uploader.upload_stream(
                { resource_type: "auto" },
                async (error, result) => {
                    if (error) {
                        return res.status(400).send({
                            status: 400,
                            data: { message: "Error uploading profile photo to Cloudinary" },
                        });
                    }

                    req.cloudinaryResponse = result;
                    next();
                }
            ).end(req.file.buffer);
        } else {
            // If there is no profile photo, proceed without uploading to Cloudinary
            next();
        }
    } catch (error) {
        return res.status(500).send({
            status: 500,
            data: { message: "Internal Server Error" },
        });
    }
};

module.exports = {
    handleFileUpload,
    uploadToCloudinary
}