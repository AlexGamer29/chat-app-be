const authenticateJWT = require("./token-verification/token-verification.middleware");
const { handleFileUpload, uploadToCloudinary } = require("./upload/upload.middleware")

module.exports = {
    authenticateJWT,
    handleFileUpload,
    uploadToCloudinary
}