const Task = require("../models/task");

exports.getTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const tasks = await Task.findAll({ where: { creatorId: userId } });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createTask = async (req, res) => {
  const { title, description, status, priority, assigneeId, dueDate } =
    req.body;
  try {
    const userId = req.user.id;
    const task = await Task.create({
      title,
      description,
      creatorId: userId,
      assigneeId: assigneeId || null,
      status: status || "todo",
      priority: priority || "medium",
      dueDate: dueDate || null,
    });
    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status, priority, assigneeId, dueDate } =
    req.body;
  try {
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    // Pastikan hanya creator yang dapat mengupdate (opsional, sesuai kebutuhan)
    if (task.creatorId !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this task" });
    }

    await task.update({
      title: title !== undefined ? title : task.title,
      description: description !== undefined ? description : task.description,
      status: status !== undefined ? status : task.status,
      priority: priority !== undefined ? priority : task.priority,
      assigneeId: assigneeId !== undefined ? assigneeId : task.assigneeId,
      dueDate: dueDate !== undefined ? dueDate : task.dueDate,
    });

    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    // Pastikan hanya creator yang dapat menghapus (opsional)
    if (task.creatorId !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this task" });
    }

    await task.destroy();
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
