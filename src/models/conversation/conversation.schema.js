const mongoose = require("mongoose");
const schemaType = require("../../types/mongoose");

const conversationSchema = new mongoose.Schema(
    {
        conversation_name: {
            type: schemaType.TypeString,
            required: true,
        },
        is_group: {
            type: schemaType.TypeBoolean,
            required: true
        },
        group_admin: { type: schemaType.TypeObjectId, ref: "users" },
    },
    { timestamps: true }
);

module.exports = conversationSchema;
