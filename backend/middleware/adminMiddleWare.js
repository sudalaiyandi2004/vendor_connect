// backend/middleware/adminAuth.js

const isAdmin = (req, res, next) => {
    // Assuming you have a way to identify if a user is an admin, e.g., user role or isAdmin flag
    if (req.user.isAdmin) {
      return next();
    }
  
    return res.status(403).json({ message: 'Not authorized as admin' });
  };
  
  module.exports = isAdmin;
  