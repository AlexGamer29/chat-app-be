const { ObjectId } = require("mongodb");
const { insertNewDocument, deleteDocument, deleteDocuments, find, updateDocument } = require("../../helpers");
const Joi = require("joi");
const bcrypt = require("bcryptjs");

const addUserSchema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
});

const deleteUserSchema = Joi.object({
    _id: Joi.string().required(),
});

const updateUserSchema = Joi.object({
    first_name: Joi.string(),
    last_name: Joi.string(),
    username: Joi.string(),
    password: Joi.string(),
});
const addUser = async (req, res) => {
    try {
        const validate = await addUserSchema.validateAsync(req.body);
        const user_type = await insertNewDocument("users", req.body);
        return res.status(200).send({ status: 200, user_type });
    } catch (e) {
        res.status(400).send({ status: 400, message: e.message });
    }
};

const deleteUser = async (req, res) => {
    const { _id } = req.body;
    try {
        const validate = await deleteUserSchema.validateAsync(req.body);
        const deleteQuery = { _id };
        let response = await deleteDocument("users", deleteQuery);
        return res.status(200).send({ status: 200, response });
    } catch (e) {
        res.status(400).send({ status: 400, message: e.message });
    }
};

const deleteUsers = async (req, res) => {
    try {
        const deleteQuery = {};
        let response = await deleteDocuments("users", deleteQuery);
        return res.status(200).send({ status: 200, response });
    } catch (e) {
        res.status(400).send({ status: 400, message: e.message });
    }
};

const getUsers = async (req, res) => {
    console.log(`ID NE`, req.user)
    try {
        let response = await find("users", { _id: { $ne: req.user.id }, });
        return res.status(200).send({ status: 200, response });
    } catch (e) {
        res.status(400).send({ status: 400, message: e.message });
    }
}

const updateUser = async (req, res) => {
    const user_id = req.user.id;
    const { first_name, last_name, username, password } = req.body
    try {
        const validate = await updateUserSchema.validateAsync(req.body);
        const hashPassword = await bcrypt.hashSync(password, bcrypt.genSaltSync(10))
        const user = await updateDocument(
            "users",
            { _id: new ObjectId(user_id) },
            { first_name, last_name, username, password: hashPassword }
        );
        user.password = undefined;
        return res.status(200).send({ status: 200, user: user });
    } catch (e) {
        res.status(400).send({ status: 400, message: e.message });
    }
};

const searchUser = async (req, res) => {
    try {
        console.log(req.user.id)

        const keyword = req.query.search ? {
            _id: { $ne: req.user.id },
            $or: [
                { first_name: { $regex: req.query.search, $options: "i" } },
                { last_name: { $regex: req.query.search, $options: "i" } }
            ],
        } : { _id: { $ne: req.user.id } }
        let response = await find("users", keyword, { password: 0 });
        return res.status(200).send({ status: 200, data: response });
    } catch (e) {
        res.status(400).send({ status: 400, message: e.message });
    }
};


module.exports = { addUser, deleteUser, deleteUsers, getUsers, updateUser, searchUser };