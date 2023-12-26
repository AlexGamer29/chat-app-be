const { insertNewDocument, find } = require("../../helpers");
const Joi = require("joi");
const { ObjectId } = require("mongodb");

const pushScheduleMessage = Joi.object({
    conversation_id: Joi.string().required(),
    content: Joi.string().required().valid('image', 'text'),
    message: Joi.string().required(),
    scheduled: Joi.string().required()
});

const saveScheduleMessage = async (req, res) => {
    try {
        const validate = await pushScheduleMessage.validateAsync(req.body);
        const user = await find("users", { _id: req.user.id }, { password: 0 })
        const response = await insertNewDocument("scheduleMessage", {
            ...validate,
            from: new ObjectId(req.user.id),
            seen_users: [user[0]],
        });
        return res.status(200).send({ status: 200, data: response });
    } catch (e) {
        res.status(400).send({ status: 400, message: e.message });
    }
};

module.exports = { saveScheduleMessage };