const { insertNewDocument } = require("../../helpers");
const Joi = require("joi");
const { ObjectId } = require("mongodb");

const sendMessageSchema = Joi.object({
    conversation_id: Joi.string().required(),
    content: Joi.string().required().valid('image', 'text'),
    message: Joi.string().required()
});

const sendMessage = async (req, res) => {
    try {
        const validate = await sendMessageSchema.validateAsync(req.body);
        const response = await insertNewDocument("message", {
            ...validate,
            from: new ObjectId(req.user.id),
            seen_users: [new ObjectId(req.user.id)],
            sent_datetime: new Date()
        });
        return res.status(200).send({ status: 200, data: response });
    } catch (e) {
        res.status(400).send({ status: 400, message: e.message });
    }
};

module.exports = { sendMessage };