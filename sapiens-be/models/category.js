const mongoose = require('mongoose');

// Create a mongoose schema
const userSchema = new mongoose.Schema({
    // _id: mongoose.$oid,
    page_content: String,
    metadata: {
        source: String
    },
    agent_loader: String,
    timestamp: { type: Date, default: Date.now },
    query: String,
    score: Number,
    message_id: String,
    "Data Source": String,
    Score: Number,
    Source: String,
});

const User = mongoose.model('User', userSchema);

const uploadBulk = async (sources) => {
    try {
        const newSources = await Source.bulkSave(sources);
        return newSources;
    } catch (err) {
        throw new Error('Failed to upload sources' + err.message);
    }
};

module.exports = { User, uploadBulk };