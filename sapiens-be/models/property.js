const mongoose = require('mongoose');

// Create a mongoose schema
const propertySchema = new mongoose.Schema({
    // _id: mongoose.$oid,
    name: {
        type: String,
        required: true
    },
    address: {
        street: String,
        number: String,
        neighborhood: String,
        city: String,
        state: String,
		country: String,
        zip: String,
    },
    category: {
        type: String,
        required: true,
        default: ['condo', 'villa', 'open_house', 'land', 'bought']
    },
    price: { type: Number, required:true },
    currency: String,
    image_url: { type: String, required: true },
    buyer: mongoose.ObjectId,
    timestamp: { type: Date, default: Date.now }
});

const Property = mongoose.model('Property', propertySchema);

const uploadBulk = async (properties) => {
    try {
        const newProperties = await Property.bulkSave(properties);
        return newProperties;
    } catch (err) {
        throw new Error('Failed to upload properties' + err.message);
    }
};

module.exports = { Property, uploadBulk };