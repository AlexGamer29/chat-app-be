const mongoose = require("mongoose");
const schemaType = require("../../types/mongoose");

const memberSchema = new mongoose.Schema(
    {
        user_id: { type: schemaType.ObjectID, ref: 'users' },
        conversation_id: { type: schemaType.ObjectID, ref: 'conversation' },
        joined_at: schemaType.TypeDate,
        left_at: schemaType.TypeDate
    },
    { timestamps: true }
);

module.exports = memberSchema;
