const AuthSchema = require('../models/authDB');
const jwt = require('jsonwebtoken');

exports.Signup = async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    try {
        // Validate required fields
        if (!username || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check password match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        // Check for existing user
        const existingUser = await AuthSchema.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Email already registered" });
        }

        // Create new user
        const user = await AuthSchema.create({ username, email, password });

        // Return success response
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            },
        });
    } catch (error) {
        console.error("SIGNUP ERROR:", error);
        res.status(500).json({ message: error.message });
    }
};

exports.Login = async (req, res) => {
    const { username, password, role } = req.body;

    try {
        // Find user with matching credentials
        const existingUser = await AuthSchema.findOne({ username, password, role });

        if (!existingUser) {
            return res.status(401).json({ message: "Invalid username or password or role" });
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                id: existingUser._id,
                role: existingUser.role,
                username: existingUser.username
            },
            process.env.SECRET_KEY,
            { expiresIn: "7d" }
        );

        // Return success response with token
        res.status(200).json({
            message: "Login successful",
            user: {
                id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
                role: existingUser.role,
            },
            token: token
        });
    } catch (error) {
        console.error("LOGIN ERROR:", error);
        res.status(500).json({ message: error.message });
    }
};