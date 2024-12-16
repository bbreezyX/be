const { Task } = require("../models"); // Asumsikan model Task sudah dibuat di folder models
const { Op } = require("sequelize"); // Untuk operator Sequelize

// // GET all tasks
// exports.getAllTasks = async (req, res) => {
//     try {
//         const tasks = await Task.findAll();
//         res.status(200).json({ tasks });
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching tasks', error });
//     }
// };

// GET task by ID
exports.getTasks = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ message: "Error fetching task", error });
  }
};

// CREATE new task
exports.createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      status,
      priority,
      creator_id,
      assignee_id,
      due_date,
    } = req.body;
    const task = await Task.create({
      title,
      description,
      status: status || "todo",
      priority: priority || "medium",
      creator_id,
      assignee_id,
      due_date,
    });
    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
  }
};

// UPDATE task
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority, assignee_id, due_date } =
      req.body;
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    await task.update({
      title: title || task.title,
      description: description || task.description,
      status: status || task.status,
      priority: priority || task.priority,
      assignee_id: assignee_id !== undefined ? assignee_id : task.assignee_id,
      due_date: due_date || task.due_date,
    });

    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
};

// DELETE task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    await task.destroy();
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
};
