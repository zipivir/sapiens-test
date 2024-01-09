const mongoose = require('mongoose');

// Create a mongoose schema
const roleSchema = new mongoose.Schema({
    // _id: mongoose.$oid,
    name: {
        type: String,
        require: true,
        unique: true
    },
    actions: Array,
    timestamp: { type: Date, default: Date.now },
});

const Role = mongoose.model('Role', roleSchema);

module.exports = { Role };