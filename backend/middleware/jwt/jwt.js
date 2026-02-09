
const jwt = require('jsonwebtoken');

exports.JWT_Verify = (req, res, next) => {
    // Get authorization header
    const authHeader = req.headers.authorization;

    // Check if authorization header exists
    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header missing" });
    }

    try {
        // Extract token from "Bearer <token>" format
        const token = authHeader.split(" ")[1];

        // Verify token and decode payload
        const decodedUser = jwt.verify(token, process.env.SECRET_KEY);

        // Attach user data to request object for use in route handlers
        req.user = decodedUser;

        // Continue to next middleware/route handler
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};