const { insertNewDocument, find } = require("../../helpers");
const Joi = require("joi");
const { ObjectId } = require("mongodb");

const sendMessageSchema = Joi.object({
    conversation_id: Joi.string().required(),
    content: Joi.string().required().valid('image', 'text'),
    message: Joi.string().required()
});

const getMessageByConversationIdSchema = Joi.object({
    conversation_id: Joi.string().required(),
});

const sendMessage = async (req, res) => {
    try {
        const validate = await sendMessageSchema.validateAsync(req.body);
        const user = await find("users", { _id: req.user.id }, { password: 0 })
        const response = await insertNewDocument("message", {
            ...validate,
            from: new ObjectId(req.user.id),
            seen_users: [user[0]],
            sent_datetime: new Date()
        });
        return res.status(200).send({ status: 200, data: response });
    } catch (e) {
        res.status(400).send({ status: 400, message: e.message });
    }
};

const getMessageByConversationId = async (req, res) => {
    try {
        const validate = await getMessageByConversationIdSchema.validateAsync(req.body);
        const messages = await find("message", {
            ...validate
        });

        const populatedMessages = await Promise.all(messages.map(async (message) => {
            const seenUsers = await Promise.all(message.seen_users.map(async (userId) => {
                const userObject = await find("users", { _id: userId }, { password: 0 });
                return userObject[0];
            }));

            return {
                ...message._doc,
                seen_users: seenUsers,
            };
        }));
        return res.status(200).send({ status: 200, data: populatedMessages });
    } catch (e) {
        res.status(400).send({ status: 400, message: e.message });
    }
};

module.exports = { sendMessage, getMessageByConversationId };