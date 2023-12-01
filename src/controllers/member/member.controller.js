const {
  getAggregate,
  findOne,
  findAndPopulateNested,
  findAndPopulate,
} = require("../../helpers");
const { ObjectId } = require("mongodb");
const Joi = require("joi");

const addMemberSchema = Joi.object({
  user_id: Joi.string().required(),
  conversation_id: Joi.string().required(),
  joined_at: new Date(),
  left_at: new Date(),
});

const addMember = async (req, res) => {
  try {
    // const validate = await addMemberSchema.validateAsync(req.body);
    // const user_type = await insertNewDocument("member", req.body);
    const { user_id } = req.body;

    const user1_id = new ObjectId(req.user.id);
    const user2_id = new ObjectId(user_id);

    const agg = [
      {
        $lookup: {
          from: "members",
          localField: "_id",
          foreignField: "conversation_id",
          as: "members",
        },
      },
      {
        $match: {
          $expr: {
            $and: [
              {
                $setIsSubset: [[user1_id, user2_id], "$members.user_id"],
              },
              {
                $eq: [
                  {
                    $size: "$members",
                  },
                  2,
                ],
              },
            ],
          },
        },
      },
    ];
    const user_type = await getAggregate("conversation", agg);
    // const user_type = await findAndPopulate("member", { user_id: req.user.id }, 'conversation_id');

    // const conversations = user_type.map(member => member.conversation_id);

    // // Now, find all members related to the extracted conversations
    // const data = await findAndPopulateNested('member', {conversation_id: { $in: conversations }}, "user_id")

    return res.status(200).send({ status: 200, user_type });
  } catch (e) {
    res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = { addMember };
