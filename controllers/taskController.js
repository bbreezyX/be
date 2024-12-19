const { User, Task } = require("../models");
const { Op } = require("sequelize");

exports.getTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const tasks = await Task.findAll({
      where: {
        [Op.or]: [{ creator_id: userId }, { assignee_id: userId }],
      },
      include: [
        {
          model: User,
          as: "creator",
          attributes: ["id", "username", "nama"],
        },
        {
          model: User,
          as: "assignee",
          attributes: ["id", "username", "nama"],
        },
      ],
      order: [["created_at", "DESC"]],
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

    const {
      title,
      description,
      status,
      priority,
      assignee_username,
      due_date,
    } = req.body;

    // Cari user berdasarkan username jika ada
    let assignee_id = null;
    if (assignee_username) {
      const assignee = await User.findOne({
        where: { username: assignee_username },
      });
      if (!assignee) {
        return res.status(404).json({ message: "Assignee username not found" });
      }
      assignee_id = assignee.id;
    }

    const task = await Task.create({
      title,
      description,
      creator_id: req.user.id,
      assignee_id,
      status: status || "todo",
      priority: priority || "medium",
      due_date: due_date || null,
    });

    // Ambil task yang baru dibuat dengan informasi lengkap
    const createdTask = await Task.findOne({
      where: { id: task.id },
      include: [
        {
          model: User,
          as: "creator",
          attributes: ["id", "username", "nama"],
        },
        {
          model: User,
          as: "assignee",
          attributes: ["id", "username", "nama"],
        },
      ],
    });

    res.status(201).json({
      message: "Task created successfully",
      task: createdTask,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.id;

    const task = await Task.findOne({
      where: {
        id: taskId,
        creator_id: userId,
      },
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found or unauthorized",
      });
    }

    const {
      title,
      description,
      status,
      priority,
      assignee_username,
      due_date,
    } = req.body;

    let new_assignee_id = task.assignee_id;
    if (assignee_username !== undefined) {
      if (assignee_username === null || assignee_username === "") {
        new_assignee_id = null;
      } else {
        const assignee = await User.findOne({
          where: { username: assignee_username },
        });
        if (!assignee) {
          return res.status(404).json({
            message: "Assignee username not found",
          });
        }
        new_assignee_id = assignee.id;
      }
    }

    await task.update({
      title: title || task.title,
      description: description || task.description,
      status: status || task.status,
      priority: priority || task.priority,
      assignee_id: new_assignee_id,
      due_date: due_date || task.due_date,
    });

    // Ambil task yang sudah diupdate dengan informasi lengkap
    const updatedTask = await Task.findOne({
      where: { id: task.id },
      include: [
        {
          model: User,
          as: "creator",
          attributes: ["id", "username", "nama"],
        },
        {
          model: User,
          as: "assignee",
          attributes: ["id", "username", "nama"],
        },
      ],
    });

    res.json({
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.id;

    const task = await Task.findOne({
      where: {
        id: taskId,
        creator_id: userId,
      },
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found or unauthorized",
      });
    }

    await task.destroy();

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
