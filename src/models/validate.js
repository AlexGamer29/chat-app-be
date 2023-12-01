const { member } = require('./index.model')

const joinInfo = {
    user_id: '655efa8e6abde0411f572951', // Assuming 'user' is a previously created user
    conversation_id: '6563814847ea0b9305de0bd7',
    joined_at: new Date(),
    left_at: new Date()
};

member.create(joinInfo)
    .then((newMember) => {
        console.log('User joined conversation:', newMember);
    })
    .catch((err) => {
        console.error('Error saving member:', err);
    });