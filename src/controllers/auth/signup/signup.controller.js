const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const { insertNewDocument, findOne } = require("../../../helpers");
const { SECRET } = require("../../../config");

// Joi schema for validation with username, email, password
const schema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,30}$")),
    repeat_password: Joi.ref('password'),
}).with('password', 'repeat_password');;

const signUp = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Start to validate request body
        const validate = await schema.validateAsync(req.body);
        // Check user is exist in db "users" by email
        const check_user_exist = await findOne("users", { email });
        if (check_user_exist) {
            return res
                .status(404)
                .send({ status: 404, message: "User already exist!" });
        }
        // If not exist then create object new user with information provided and hashed password (Bcrypt)
        const new_user = {
            ...req.body,
            password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
        };
        // Insert new user to db "users"
        const user = await insertNewDocument("users", new_user);
        // Sign jwt token with SECRET
        let token = jwt.sign({ id: new_user._id }, SECRET);
        // Remove password then return in response
        user.password = undefined;
        return res.status(200).send({
            status: 200, data: {
                user, token
            }
        });
    } catch (e) {
        return res.status(400).send({
            status: 400, data: {
                message: e.message
            }
        });
    }
};

module.exports = signUp;
