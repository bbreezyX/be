const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  // Registrasi user baru
  createUser: async (req, res) => {
    try {
      const { username, password, nama } = req.body;

      // Validasi input
      if (!username || !password || !nama) {
        return res
          .status(400)
          .json({ message: "Username, password, and name are required" });
      }

      // Cek apakah user sudah ada
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Buat user baru
      const newUser = await User.create({
        username,
        password: hashedPassword,
        nama,
      });

      return res
        .status(201)
        .json({ message: "User created successfully", user: newUser });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { username, password } = req.body;
      console.log("Login attempt with:", { username, password });

      // Validasi input
      if (!username || !password) {
        return res
          .status(400)
          .json({ message: "Username and password are required" });
      }

      // Cari user
      const user = await User.findOne({
        where: { username },
        attributes: ["id", "username", "password", "nama"], // Pastikan semua field yang diperlukan
      });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Cek password dengan try-catch untuk menangkap error
      try {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log("Password validation result:", isPasswordValid);

        if (!isPasswordValid) {
          return res.status(401).json({ message: "Invalid password" });
        }
      } catch (error) {
        console.error("Password comparison error:", error);
        return res.status(500).json({ message: "Error validating password" });
      }

      // Generate token JWT
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      // Return user data dan token
      return res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          username: user.username,
          nama: user.nama,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({ message: error.message });
    }
  },

  // Ambil semua user
  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll({
        attributes: { exclude: ["password"] },
      });
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};
