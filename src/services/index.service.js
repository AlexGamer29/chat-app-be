const { ObjectId } = require("mongodb");
const { insertNewDocument, find, deleteDocument } = require("../helpers");

async function sendScheduledMessages() {
    try {
        // Calculate the time range (e.g., +/- 2.5 minutes around the current time)
        const currentTime = new Date();
        const startTime = new Date(currentTime.getTime() - 2.5 * 60 * 1000); // 2.5 minutes ago
        const endTime = new Date(currentTime.getTime() + 2.5 * 60 * 1000);   // 2.5 minutes later

        // Find all documents in scheduleMessages within the time range
        const scheduledMessages = await find("scheduleMessage", {
            scheduled: { $gte: startTime, $lte: endTime }
        });

        // Process and insert scheduledMessages into messages collection
        const insertPromises = scheduledMessages.map(async (element) => {
            await insertNewDocument("message", {
                conversation_id: new ObjectId(element.conversation_id),
                from: new ObjectId(element.from),
                content: element.content,
                message: element.message,
                sent_datetime: element.scheduled,
                seen_users: [element.seen_users]
            });

            // Delete the processed document from scheduleMessages
            await deleteDocument("scheduleMessage", { _id: new ObjectId(element._id) });
        });

        // Wait for all insert and delete operations to complete
        await Promise.all(insertPromises);

    } catch (err) {
        console.error('Error processing scheduled messages:', err);
    }
}

module.exports = { sendScheduledMessages };