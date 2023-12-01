// Import necessary libraries and modules
const jwt = require('jsonwebtoken');
const { SECRET } = require("../../config"); // Replace with your actual secret key

// Define your middleware function
function authenticateJWT(req, res, next) {
    // Get the JWT token from the request's Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Authentication failed. No token provided.' });
    }

    // Check if the Authorization header starts with 'Bearer'
    if (authHeader.startsWith('Bearer ')) {
        // Extract the token from the header
        const token = authHeader.slice(7); // Removes 'Bearer ' prefix

        // Verify the token using your secret key
        jwt.verify(token, SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Authentication failed. Invalid token.' });
            }
            // If the token is valid, you can attach the user object to the request for later use in route handlers
            req.user = user;

            // Continue to the next middleware or route handler
            next();
        });
    } else {
        return res.status(401).json({ message: 'Authentication failed. Invalid token format.' });
    }
}

module.exports = authenticateJWT;
