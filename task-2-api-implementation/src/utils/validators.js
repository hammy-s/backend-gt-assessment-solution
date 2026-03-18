const validPriorities = ['low', 'medium', 'high'];
const validStatuses = ['pending', 'in-progress', 'completed'];

const validateTitle = (title) => {
  return title && typeof title === 'string' && title.trim() !== '';
};

const validatePriority = (priority) => {
  return priority && validPriorities.includes(priority);
};

const validateStatus = (status) => {
  return status && validStatuses.includes(status);
};

const validateUserId = (id) => {
  return Number.isInteger(id) && id > 0;
};

module.exports = {
  validPriorities,
  validStatuses,
  validateTitle,
  validatePriority,
  validateStatus,
  validateUserId
};
