const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require("../models/user.js");
const { Role } = require("../models/role.js");

// GET all users
const getAll = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Invalid username' });
        }
        
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        
        const token = jwt.sign({ id: user.id, roleId: user.roleId }, process.env.JWT_KEY, {
            expiresIn: '15m'
        });
    
        /// test jwt token
        // console.log('jjjj', token);
        // const decode = jwt.verify(token, 'secret_key');
        // console.log('decode', decode);

        res.status(201).send({msg: 'Login successfully', token });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// create new user
const signup = async (req, res) => {
    try {
        const { username, email, password, roleName, account } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const role = await Role.findOne({ name: roleName });
        const roleId = role._id || Role.findOne({ name: 'viewer' })?._id;
        
        const user = new User({
            username,
            email,
            password: hashedPassword,
            roleId,
            account
        });    

        const validUser = user.validateSync();
        const userDB = await user.save();
        res.status(201).json({ msg: 'User registered successfully', user: userDB });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = { getAll, login, signup };