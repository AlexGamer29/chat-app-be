const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.users = require("./user/users.model");
db.member = require("./member/member.model");
db.conversation = require("./conversation/conversation.model");
db.message = require("./message/message.model");
db.scheduleMessage = require("./schedule-message/schedule-message.model");

// // Create two users
// const user1 = new db.users({
//     first_name: 'John',
//     last_name: 'Doe',
//     username: 'johndoe',
//     email: 'john@example.com',
//     password: 'password123',
// });

// const user2 = new db.users({
//     first_name: 'Jane',
//     last_name: 'Doe',
//     username: 'janedoe',
//     email: 'jane@example.com',
//     password: 'password456',
// });

// // Save users
// Promise.all([user1.save(), user2.save()])
//     .then(users => {
//         // Create a conversation
//         const conversation = new db.conversation({
//             conversation_name: 'Sample Conversation',
//         });

//         // Save conversation
//         return conversation.save().then(savedConversation => {
//             // Create members and add them to the conversation
//             const member1 = new db.member({
//                 user_id: users[0]._id,
//                 conversation_id: savedConversation._id,
//                 joined_at: new Date(),
//             });

//             const member2 = new db.member({
//                 user_id: users[1]._id,
//                 conversation_id: savedConversation._id,
//                 joined_at: new Date(),
//             });

//             // Save members
//             return Promise.all([member1.save(), member2.save()]);
//         });
//     })
//     .then(members => {
//         console.log('Conversation and members added successfully:', members);
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });

module.exports = db;
