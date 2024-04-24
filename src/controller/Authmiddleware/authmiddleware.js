const jwt = require('jsonwebtoken');
const UsersModel = require("../../Schema/userSchema");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization');
    console.log(token, 'tokennnn32');

    if (!token) {
      return res.status(401).json({ error: 'Authorization token missing' });
    }

    const tokenPart = token.split(' ')[1];
    
    const decoded = jwt.verify(tokenPart, process.env.JWT_SECRET);
    const user = await UsersModel.findById(decoded.userId);
    console.log(user.role, 'userrole3223')
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    if (user.role === "employee" || user.role === "hr") {
      return res.status(403).json({ error: 'Unauthorized access' });
    }

    
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = authMiddleware;
