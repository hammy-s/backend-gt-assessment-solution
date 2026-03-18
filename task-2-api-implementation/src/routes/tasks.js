const express = require('express');
const router = express.Router();
const extractUserId = require('../middleware/auth');
const {
  createTask,
  getTasks,
  updateTaskDetails,
  updateTaskStatus,
  unassignTask,
  deleteTask
} = require('../controllers/taskController');

router.use(extractUserId);

router.post('/', createTask);
router.get('/', getTasks);
router.patch('/:id', updateTaskDetails);
router.patch('/:id/status', updateTaskStatus);
router.patch('/:id/unassign', unassignTask);
router.delete('/:id', deleteTask);

module.exports = router;
