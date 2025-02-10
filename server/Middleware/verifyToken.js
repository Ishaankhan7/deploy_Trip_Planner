const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const verifyToken = async (req, res, next) => {
  try {
    // Check token in multiple places: cookies, authorization header, or request body (for localStorage)
    const token = req.cookies?.token || 
                  req.headers?.authorization?.split(" ")[1] || 
                  req.body?.token;

    

    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (decoded.tempUserId) {
      return res.status(403).json({ message: 'Access denied. Invalid token type.' });
    }

    req.user = decoded;
    next();
  } catch (err) {
    console.error('Token verification failed:', err.message);
    return res.status(403).json({ message: 'Access denied. Invalid token.' });
  }
};

module.exports = verifyToken;
