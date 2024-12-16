const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const TaskController = require("../controllers/taskController");

router.get("/tasks", authMiddleware, TaskController.getTasks);
router.post("/tasks", authMiddleware, TaskController.createTask);
router.put("/tasks/:id", authMiddleware, TaskController.updateTask);
router.delete("/tasks/:id", authMiddleware, TaskController.deleteTask);

module.exports = router;
