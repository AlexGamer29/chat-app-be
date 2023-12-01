const mongoose = require("mongoose");
const schemaType = require("../../types/mongoose");

const messageSchema = new mongoose.Schema(
    {
        conversation_id: { type: schemaType.ObjectID, ref: 'conversation' },
        from: schemaType.TypeString,
        content: {
            type: schemaType.TypeString,
            enum: ['image', 'text']
        },
        message: schemaType.TypeString,
        status: {
            type: schemaType.TypeString,
            default: 'unseen'
        },
        sent_datetime: schemaType.TypeString
    },
    { timestamps: true }
);

module.exports = messageSchema;
