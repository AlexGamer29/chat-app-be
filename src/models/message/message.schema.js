const mongoose = require("mongoose");
const schemaType = require("../../types/mongoose");

const messageSchema = new mongoose.Schema(
    {
        conversation_id: { type: schemaType.ObjectID, ref: 'conversation' },
        from: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
        content: {
            type: schemaType.TypeString,
            enum: ['image', 'text']
        },
        message: schemaType.TypeString,
        seen_users: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
        sent_datetime: schemaType.TypeDate
    },
    { timestamps: true }
);

module.exports = messageSchema;
