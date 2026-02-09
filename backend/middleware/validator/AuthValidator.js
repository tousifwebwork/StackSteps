
const { body } = require("express-validator");

// Signup Validation Rules
exports.SignupValidator = [
    body('username')
        .trim()
        .notEmpty().withMessage('Username is required')
        .isLength({ min: 5 }).withMessage('Username must be at least 5 characters long'),

    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email address'),

    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
];

// Login Validation Rules
exports.LoginValidator = [
    body('username')
        .trim()
        .notEmpty().withMessage('Username is required')
        .isLength({ min: 5 }).withMessage('Username must be at least 5 characters long'),

    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
];