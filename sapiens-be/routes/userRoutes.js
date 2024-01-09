const express = require('express');
const { checkUserRole } = require("../middleware/middleware");
const { login, signup, getAll } = require("../controllers/users");

const router = express.Router();

router.get('/', checkUserRole('admin'), getAll);
router.post('/login', login);
router.post('/signup', signup);

module.exports = router;