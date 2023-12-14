const uploadImage = async (req, res) => {
    try {
        const url = req.file.path;
        return res.status(200).send({ status: 200, data: url });
    } catch (e) {
        res.status(400).send({ status: 400, message: e.message });
    }
};

module.exports = { uploadImage };