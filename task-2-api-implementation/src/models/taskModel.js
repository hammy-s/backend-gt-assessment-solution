let tasks = [];
let nextId = 1;

const TaskModel = {
  getAll: () => tasks,
  findById: (id) => tasks.find(t => t.id === id),
  create: (taskData) => {
    const newTask = { id: nextId++, ...taskData };
    tasks.push(newTask);
    return newTask;
  },
  update: (id, updates) => {
    const task = tasks.find(t => t.id === id);
    if (task) Object.assign(task, updates);
    return task;
  },
  delete: (id) => {
    const index = tasks.findIndex(t => t.id === id);
    if (index !== -1) tasks.splice(index, 1);
    return index !== -1;
  }
};

module.exports = TaskModel;
