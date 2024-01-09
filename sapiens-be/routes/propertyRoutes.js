const express = require('express');
const { checkUserRole, checkUserPermission } = require("../middleware/middleware");
const { getAll, getProperty, getPropertyByCategory, createProperty, buyProperty } = require("../controllers/properties.js");

const router = express.Router();

router.get('/', checkUserPermission('proeprties_read'), getAll);
router.get('/:id', checkUserPermission('proeprties_read'), getProperty);
// router.get('/:category', checkUserPermission('proeprties_read'), getPropertyByCategory);
router.post('/', checkUserRole('admin'), createProperty);
router.patch('/:id/buy', checkUserPermission('properties_buy'), buyProperty);

module.exports = router;