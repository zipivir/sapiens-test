const { Property } = require("../models/property.js");
const { use } = require("../routes/userRoutes.js");

// GET all users
const getAll = async (req, res) => {
    try {
        const { search } = req.query;
        const {user, role} = req.session;

        const regex = new RegExp(search, 'i');
        const query = {};
        if (role?.name !== 'admin') {
            query.buyer = user.id;
        }

        if (search) {
            query.$or = [
                { category: {$regex: regex} },
                { 'address.street': {$regex: regex} },
                { 'address.neighborhood': {$regex: regex} },
                { 'address.city': {$regex: regex} },
                { 'address.zip': {$regex: regex} },
            ]
        }
        console.log('query: ', query);

        const properties = await Property.find(query);
        // const newProperties = properties.map(p => ({
        //     ...p,
        //     bought: p.buyer // === user.id,
        //   }));
        // console.log('kkkk', newProperties);
        res.status(200).send(properties);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const getProperty = async (req, res) => {
    try {
        const property = await Property.find(req.params.id);
        res.status(200).send(property);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const getPropertyByCategory = async (req, res) => {
    try {
        const property = await Property.find(req.params.categoryId);
        res.status(200).send(property);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// create new property
const createProperty = async (req, res) => {
    try {
        const property = new Property(req.body);    

        const validProperty = property.validateSync();
        const propertyDB = await property.save();
        console.log('property', propertyDB);
        res.status(200).send({msg: 'Property created successfully', property });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// update property
const buyProperty = async (req, res) => {
    try {
        const property = await Property.save(req.body);
        res.status(200).send({msg: 'Property updated successfully', property });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = { getAll, getProperty, getPropertyByCategory, createProperty, buyProperty };