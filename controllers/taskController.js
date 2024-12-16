const Task = require("../models/task");

// Valid enum values based on database schema
const VALID_STATUSES = ["todo", "in_progress", "done"]; // adjust these based on your enum_tasks_status
const VALID_PRIORITIES = ["low", "medium", "high"]; // adjust these based on your enum_tasks_priority

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

const createResponse = (success, message, data = null, error = null) => ({
  success,
  message,
  data,
  error,
});

const validateTaskInput = (data) => {
  if (
    data.title &&
    (typeof data.title !== "string" || data.title.length > 255)
  ) {
    throw new ValidationError(
      "Title must be a string with maximum 255 characters"
    );
  }

  if (data.status && !VALID_STATUSES.includes(data.status)) {
    throw new ValidationError(
      `Status must be one of: ${VALID_STATUSES.join(", ")}`
    );
  }

  if (data.priority && !VALID_PRIORITIES.includes(data.priority)) {
    throw new ValidationError(
      `Priority must be one of: ${VALID_PRIORITIES.join(", ")}`
    );
  }

  if (data.dueDate && isNaN(new Date(data.dueDate).getTime())) {
    throw new ValidationError("Invalid due date format");
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { creator_id: req.user.id },
      order: [["created_at", "DESC"]],
    });

    return res
      .status(200)
      .json(createResponse(true, "Tasks retrieved successfully", tasks));
  } catch (error) {
    console.error("Error in getTasks:", error);
    return res
      .status(500)
      .json(
        createResponse(false, "Failed to retrieve tasks", null, error.message)
      );
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description, status, priority, assignee_id, due_date } =
      req.body;

    if (!title) {
      throw new ValidationError("Title is required");
    }

    validateTaskInput(req.body);

    const task = await Task.create({
      title,
      description: description || null,
      status: status || "todo", // matches DEFAULT in schema
      priority: priority || "medium", // matches DEFAULT in schema
      creator_id: req.user.id,
      assignee_id: assignee_id || null,
      due_date: due_date || null,
      // created_at and updated_at will be handled automatically by CURRENT_TIMESTAMP
    });

    return res
      .status(201)
      .json(createResponse(true, "Task created successfully", task));
  } catch (error) {
    const statusCode = error instanceof ValidationError ? 400 : 500;
    console.error("Error in createTask:", error);
    return res
      .status(statusCode)
      .json(
        createResponse(false, "Failed to create task", null, error.message)
      );
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    validateTaskInput(updates);

    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json(createResponse(false, "Task not found"));
    }

    if (task.creator_id !== req.user.id) {
      return res
        .status(403)
        .json(createResponse(false, "Not authorized to update this task"));
    }

    // Only update fields that were actually provided
    const updateData = {};
    [
      "title",
      "description",
      "status",
      "priority",
      "assignee_id",
      "due_date",
    ].forEach((field) => {
      if (updates[field] !== undefined) {
        updateData[field] = updates[field];
      }
    });

    // updated_at will be automatically handled by CURRENT_TIMESTAMP
    const updatedTask = await task.update(updateData);

    return res
      .status(200)
      .json(createResponse(true, "Task updated successfully", updatedTask));
  } catch (error) {
    const statusCode = error instanceof ValidationError ? 400 : 500;
    console.error("Error in updateTask:", error);
    return res
      .status(statusCode)
      .json(
        createResponse(false, "Failed to update task", null, error.message)
      );
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json(createResponse(false, "Task not found"));
    }

    if (task.creator_id !== req.user.id) {
      return res
        .status(403)
        .json(createResponse(false, "Not authorized to delete this task"));
    }

    await task.destroy();

    return res
      .status(200)
      .json(createResponse(true, "Task deleted successfully"));
  } catch (error) {
    console.error("Error in deleteTask:", error);
    return res
      .status(500)
      .json(
        createResponse(false, "Failed to delete task", null, error.message)
      );
  }
};
