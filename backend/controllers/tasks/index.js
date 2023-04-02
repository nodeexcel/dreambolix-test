const db = require("../../models");
const Task = db.Task;
const User = db.User;

const createTask = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user.id;

  try {
    const newTask = await Task.create({
      title,
      description,
      userId,
    });
    return res.status(201).json({ success: true, data: newTask });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: "Server Error" });
  }
};

async function getTasks(req, res) {
  try {
    const userId = req.user.id;
    const userData = await User.findByPk(userId, {
      attributes: { exclude: ["password"] },
      include: {
        model: Task,
        attributes: ["id", "title", "description", "completed"],
      },
    });

    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, data: userData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

async function completeTask(req, res) {
  try {
    const taskId = req.query.id;
    const task = await Task.findByPk(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found", taskId });
    }

    if (task.completed) {
      task.completed = false;
      await task.save();
      return res.status(200).json({ message: "Task completed Revert", taskId });
    }

    task.completed = true;
    await task.save();

    return res
      .status(200)
      .json({ message: "Task completed successfully", taskId });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function deleteTask(req, res) {
  try {
    const taskId = req.query.id;
    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found", taskId });
    }

    const del = await task.destroy();

    return res.status(200).json({ message: "Task deleted successfully", del });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  getTasks,
  createTask,
  completeTask,
  deleteTask,
};
