// middleware/auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please authenticate",
        data: null,
        error: "No token provided",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Cari user berdasarkan id dari token
    const user = await User.findByPk(decoded.id);

    if (!user) {
      throw new Error();
    }

    // Tambahkan user ke request object
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Please authenticate",
      data: null,
      error: "Invalid token",
    });
  }
};

module.exports = authMiddleware;
