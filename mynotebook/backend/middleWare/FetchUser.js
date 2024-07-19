const jwt = require('jsonwebtoken');
const secretKey = 'gtavicecity@2010';

// Middleware to verify JWT token and extract user information
function authMiddleware(req, res, next) {
    // Get token from header
    const authToken = req.header("Authorization");
  
    // Check if authToken exists
    if (!authToken) {
        return res.status(401).json({ msg: "No token, access denied" });
    }
  
    try {
        // Verify token
        const decoded = jwt.verify(authToken, secretKey);
  
        // Add user from token payload to request object
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ msg: "Token is not valid" });
    }
}

module.exports = authMiddleware;
