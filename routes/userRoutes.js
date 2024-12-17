const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

/**
 * @typedef User
 * @property {integer} id
 * @property {string} username.required - Username unik
 * @property {string} password.required - Password user
 * @property {string} nama.required - Nama lengkap user
 * @property {string} created_at - Waktu pembuatan akun
 */

/**
 * @route GET /users
 * @group Users - Operasi terkait user
 * @returns {Array.<User>} 200 - Daftar semua user
 */
router.get("/", userController.getAllUsers);

/**
 * @route POST /users/signup
 * @group Users - Operasi terkait user
 * @param {object} user.body.required - User signup info
 * @param {string} user.body.username.required - Username
 * @param {string} user.body.password.required - Password
 * @param {string} user.body.nama.required - Nama lengkap
 * @returns {object} 201 - User berhasil dibuat
 * @returns {Error} 400 - Input tidak valid
 */
router.post("/signup", userController.createUser);

/**
 * @route POST /users/login
 * @group Users - Operasi terkait user
 * @param {object} credentials.body.required - Kredensial login
 * @param {string} credentials.body.username.required - Username
 * @param {string} credentials.body.password.required - Password
 * @returns {object} 200 - Login berhasil dan mendapat token
 * @returns {Error} 401 - Kredensial tidak valid
 */
router.post("/login", userController.loginUser);

module.exports = router;
