const { updateDocument } = require("../../helpers")

const uploadImage = async (req, res) => {
    try {
        const user = req.user.id
        const url = req.file.path;
        console.log(user)

        const imageUpdated = await updateDocument(
            "users",
            { _id: user },
            { profile_photo: url }
        );
        imageUpdated.password = undefined;

        return res.status(200).send({ status: 200, url: url });
    } catch (e) {
        res.status(400).send({ status: 400, message: e.message });
    }
};

module.exports = { uploadImage };