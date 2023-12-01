const mongoose = require("mongoose");
const schemaType = require("../../types/mongoose");

const conversationSchema = new mongoose.Schema(
    {
        conversation_name: {
            type: schemaType.TypeString,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = conversationSchema;
