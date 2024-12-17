const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const TaskController = require("../controllers/taskController");

/**
 * @typedef Task
 * @property {integer} id
 * @property {string} title.required - Judul task
 * @property {string} description - Deskripsi task
 * @property {string} status - Enum:todo,in_progress,done
 * @property {string} priority - Enum:low,medium,high
 * @property {integer} creator_id.required - ID pembuat task
 * @property {integer} assignee_id - ID yang ditugaskan
 * @property {string} due_date - Deadline task
 */

/**
 * @route GET /tasks
 * @group Tasks - Operasi terkait task
 * @security JWT
 * @returns {Array.<Task>} 200 - Daftar semua task
 * @returns {Error} 401 - Unauthorized
 */
router.get("/", authMiddleware, TaskController.getTasks);

/**
 * @route POST /tasks
 * @group Tasks - Operasi terkait task
 * @security JWT
 * @param {object} task.body.required - Informasi task
 * @param {string} task.body.title.required - Judul task
 * @param {string} task.body.description - Deskripsi task
 * @param {string} task.body.priority - Prioritas task (low/medium/high)
 * @param {integer} task.body.assignee_id - ID user yang ditugaskan
 * @param {string} task.body.due_date - Deadline task
 * @returns {Task} 201 - Task berhasil dibuat
 * @returns {Error} 400 - Input tidak valid
 */
router.post("/", authMiddleware, TaskController.createTask);

/**
 * @route PUT /tasks/{id}
 * @group Tasks - Operasi terkait task
 * @security JWT
 * @param {integer} id.path.required - ID task
 * @param {object} task.body.required - Data yang akan diupdate
 * @param {string} task.body.title - Judul task
 * @param {string} task.body.description - Deskripsi task
 * @param {string} task.body.status - Status task
 * @param {string} task.body.priority - Prioritas task
 * @returns {Task} 200 - Task berhasil diupdate
 * @returns {Error} 404 - Task tidak ditemukan
 */
router.put("/:id", authMiddleware, TaskController.updateTask);

/**
 * @route DELETE /tasks/{id}
 * @group Tasks - Operasi terkait task
 * @security JWT
 * @param {integer} id.path.required - ID task
 * @returns {object} 200 - Task berhasil dihapus
 * @returns {Error} 404 - Task tidak ditemukan
 */
router.delete("/:id", authMiddleware, TaskController.deleteTask);

module.exports = router;
