const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middlewares/authMiddleware");

router.use(authMiddleware);

router.get("/tasks", authenticateToken, getTasks);
router.post("/tasks", authenticateToken, createTask);
router.put("/tasks/:id", authenticateToken, updateTask);
router.delete("/tasks/:id", authenticateToken, deleteTask);

module.exports = router;
