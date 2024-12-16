const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const TaskController = require("../controllers/taskController");

router.get("/", authMiddleware, TaskController.getTasks);
router.post("/", authMiddleware, TaskController.createTask);
router.put("/:id", authMiddleware, TaskController.updateTask);
router.delete("/:id", authMiddleware, TaskController.deleteTask);

module.exports = router;
