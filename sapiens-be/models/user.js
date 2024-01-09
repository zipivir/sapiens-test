const mongoose = require('mongoose');

// Create a mongoose schema
const userSchema = new mongoose.Schema({
    // _id: mongoose.$oid,
    email: {
        type: String,
        unique: true
    },
    username: String,
    password: String,
    timestamp: { type: Date, default: Date.now },
    roleId: mongoose.ObjectId,
    account: {
        bank: String,
        branch: String,
        number: String
    }
});

const User = mongoose.model('users', userSchema);

module.exports = { User };