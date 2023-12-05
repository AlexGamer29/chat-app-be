const { getUsers, addUser, deleteUser, updateUser, deleteUsers, searchUser } = require("./user/user.controller")
const { addMember } = require("./member/member.controller")
const { accessConversation, getConversation } = require("./conversation/conversation.controller")
const { sendMessage } = require("./message/message.controller")
const { signUp, logIn } = require("./auth/auth.controller")

module.exports = {
    getUsers,
    addUser,
    deleteUser,
    updateUser,
    deleteUsers,
    searchUser,
    signUp,
    logIn,
    addMember,
    accessConversation,
    getConversation,
    sendMessage
};