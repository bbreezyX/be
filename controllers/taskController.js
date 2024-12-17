const { User, Task } = require("../models");

exports.getTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const tasks = await Task.findAll({
      where: {
        creator_id: userId,
      },
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.createTask = async (req, res) => {
  try {
    const creator = await User.findByPk(req.user.id);
    if (!creator) {
      return res.status(404).json({ message: "User not found" });
    }

    const { title, description, status, priority, assignee_id, due_date } =
      req.body;

    const task = await Task.create({
      title,
      description,
      creator_id: req.user.id,
      assignee_id: assignee_id || null,
      status: status || "todo",
      priority: priority || "medium",
      due_date: due_date || null,
    });

    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.id;

    // Cek apakah task exists dan milik user yang sedang login
    const task = await Task.findOne({
      where: {
        id: taskId,
        creator_id: userId,
      },
    });

    if (!task) {
      return res
        .status(404)
        .json({ message: "Task not found or unauthorized" });
    }

    const { title, description, status, priority, assignee_id, due_date } =
      req.body;

    await task.update({
      title: title || task.title,
      description: description || task.description,
      status: status || task.status,
      priority: priority || task.priority,
      assignee_id: assignee_id || task.assignee_id,
      due_date: due_date || task.due_date,
    });

    res.json({ message: "Task updated successfully", task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.id;

    // Cek apakah task exists dan milik user yang sedang login
    const task = await Task.findOne({
      where: {
        id: taskId,
        creator_id: userId,
      },
    });

    if (!task) {
      return res
        .status(404)
        .json({ message: "Task not found or unauthorized" });
    }

    await task.destroy();

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
