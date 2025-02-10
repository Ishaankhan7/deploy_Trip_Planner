const verifyRole = (role) => {
    return (req, res, next) => {
      console.log("User Info:", req.user); // Debugging log
      if (req.user.role !== role) {
        return res.status(403).json({ message: `Access denied. Only ${role}s are allowed.` });
      }
      next();
    };
  };

    module.exports = verifyRole;