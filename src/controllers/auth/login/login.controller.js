const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { getPopulatedData } = require("../../../helpers");
const Joi = require("joi");

const { SECRET } = require("../../../config");

// Joi schema for validation with email, password
const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,30}$")),
});

const logIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Start to validate request body
        const validate = await schema.validateAsync(req.body);
        // Query user information provided in users db with email
        const populatedUser = await getPopulatedData(
            "users",
            { email },
        );
        const user = populatedUser[0];
        // If match user information then compare password with hash string
        if (user) {
            const passwordIsValid = bcrypt.compareSync(password, user.password);
            if (!passwordIsValid) {
                return res
                    .status(404)
                    .send({ status: 400, message: "Invalid email or password!" });
            }
            // Remove password then return in response
            user.password = undefined;
            // Sign jwt token with SECRET
            var token = jwt.sign({ id: user._id }, SECRET);
            return res.status(200).send({
                status: 200, data: {
                    user, token
                }
            });
            // If not match user information then return error
        } else {
            return res
                .status(404)
                .send({
                    status: 404, data: {
                        message: "User does not exist!"
                    }
                });
        }
    } catch (e) {
        res.status(400).send({
            status: 400, data: {
                message: e.message
            }
        });
    }
};

module.exports = logIn;
