const jwt = require('jsonwebtoken');

// 1. The standard bouncer (Checks if you are logged in)
const authMiddleware = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided.' });
  }

  const token = header.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next(); 
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};

// 2. The Admin bouncer (Checks if your role matches)
const requireRole = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Access denied: insufficient permissions' });
  }
  next();
};

// Export BOTH functions
module.exports = { authMiddleware, requireRole };