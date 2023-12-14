const express = require("express");
const  router = express.Router();
const multer = require('multer');
const storage = require('../../config/cloudinary/storage');
const upload = multer({ storage });
const { uploadImage } = require("../../controllers/index.controller")

router.post("/upload", upload.single('file'), uploadImage);

module.exports = router;
