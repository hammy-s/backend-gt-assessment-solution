const TaskModel = require('../models/taskModel');
const { validateTitle, validatePriority, validateStatus, validateUserId, validPriorities } = require('../utils/validators');

const createTask = (req, res) => {
  const { title, priority, assignedTo, assignedBy } = req.body;

  if (!validateTitle(title)) {
    return res.status(400).json({ error: 'title is required and must be a non-empty string' });
  }
  if (!validatePriority(priority)) {
    return res.status(400).json({ error: 'priority must be one of low, medium, high' });
  }
  if (!validateUserId(assignedTo)) {
    return res.status(400).json({ error: 'assignedTo must be a positive integer' });
  }
  if (!validateUserId(assignedBy)) {
    return res.status(400).json({ error: 'assignedBy must be a positive integer' });
  }
  if (assignedBy !== req.userId) {
    return res.status(403).json({ error: 'assignedBy must match the authenticated user' });
  }

  const newTask = TaskModel.create({
    title: title.trim(),
    priority,
    status: 'pending',
    assignedTo,
    assignedBy,
    createdAt: new Date().toISOString()
  });

  res.status(201).json(newTask);
};

const getTasks = (req, res) => {
  let tasks = TaskModel.getAll();
  const { assignedTo, status } = req.query;

  if (assignedTo) {
    const userId = parseInt(assignedTo, 10);
    if (!isNaN(userId)) {
      tasks = tasks.filter(t => t.assignedTo === userId);
    }
  }
  if (status) {
    tasks = tasks.filter(t => t.status === status);
  }

  res.json(tasks);
};

const updateTaskDetails = (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const task = TaskModel.findById(taskId);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  if (task.assignedBy !== req.userId) {
    return res.status(403).json({ error: 'Only the assigner can update task details' });
  }

  const { title, priority } = req.body;
  const updates = {};

  if (title !== undefined) {
    if (!validateTitle(title)) {
      return res.status(400).json({ error: 'title must be a non-empty string' });
    }
    updates.title = title.trim();
  }
  if (priority !== undefined) {
    if (!validatePriority(priority)) {
      return res.status(400).json({ error: 'priority must be one of low, medium, high' });
    }
    updates.priority = priority;
  }

  const updatedTask = TaskModel.update(taskId, updates);
  res.json(updatedTask);
};

const updateTaskStatus = (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const task = TaskModel.findById(taskId);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  if (task.assignedTo !== req.userId) {
    return res.status(403).json({ error: 'Only the assignee can update task status' });
  }

  const { status } = req.body;
  if (!status || !['pending', 'in-progress', 'completed'].includes(status)) {
    return res.status(400).json({ error: 'status must be one of pending, in-progress, completed' });
  }

  const updatedTask = TaskModel.update(taskId, { status });
  res.json(updatedTask);
};

const unassignTask = (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const task = TaskModel.findById(taskId);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  if (task.assignedBy !== req.userId) {
    return res.status(403).json({ error: 'Only the assigner can unassign the task' });
  }

  const updatedTask = TaskModel.update(taskId, { assignedTo: null });
  res.json(updatedTask);
};

const deleteTask = (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const task = TaskModel.findById(taskId);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  if (task.assignedBy !== req.userId) {
    return res.status(403).json({ error: 'Only the assigner can delete the task' });
  }

  TaskModel.delete(taskId);
  res.status(204).send();
};

module.exports = {
  createTask,
  getTasks,
  updateTaskDetails,
  updateTaskStatus,
  unassignTask,
  deleteTask
};
