// Middleware to check user role and actions
const jwt = require('jsonwebtoken');
const { Role } = require("../models/role.js");

const checkUserRole = (requiredRole) => {
    return async (req, res, next) => {
        const token = req.headers.authorization?.split('Bearer ')[1];
        if (token) {
            try {
                const user = jwt.verify(token, process.env.JWT_KEY);
                console.log('userrrr', user);

                // Check if user's role matches the required role
                if (user) {
                    const role = await Role.findOne({ _id: user.roleId });
                    console.log('role: ', role);
                    req.session.user = user;
                    req.session.role = role;
                    if (role && role.name === requiredRole) {
                        next();
                    }
                    else {
                        res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
                    }
                } else {
                    res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
                }
            } catch (error) {
                console.log('err', error)
                if (error.message.includes('jwt expired'))
                    res.status(401).json({ message: 'Token expired' });
                res.status(401).json({ message: 'Invalid token' });
            }
        } else {
            res.status(401).json({ message: 'No token provided' });
        }
    };
};

const checkUserPermission = (action) => {
    return async (req, res, next) => {
        const token = req.headers.authorization?.split('Bearer ')[1];
        if (token) {
            try {
                const user = jwt.verify(token, process.env.JWT_KEY);
                console.log('user: ', user);

                // Check if user's role matches the required role
                if (user) {
                    const role = await Role.findOne({ _id: user.roleId });
                    console.log('role: ', role);
                    req.session.user = user;
                    req.session.role = role;
                    if (role && role.actions.includes(action)) {
                        next();
                    }
                    else {
                        res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
                    }                } else {
                    res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
                }
            } catch (error) {
                console.log('err', error.message)
                if (error.message.includes('jwt expired'))
                    res.status(401).json({ message: 'Token expired' });
                else
                    res.status(401).json({ message: 'Invalid token' });
            }
        } else {
            res.status(401).json({ message: 'No token provided' });
        }
    };
};

module.exports = { checkUserRole, checkUserPermission }
  