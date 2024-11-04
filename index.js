const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;
let cors = require('cors');

app.use(cors());
let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 },
  { taskId: 4, text: 'Review code', priority: 1 },
];

function updateTheTasks(textId, text, priority) {
  let task = { taskId: textId, text: text, priority: priority };
  tasks.push(task);
  return tasks;
}
app.get('/tasks/add', (req, res) => {
  let textId = parseInt(req.query.taskId);
  let text = req.query.text;
  let priority = req.query.priority;
  let finalTasks = updateTheTasks(textId, text, priority);
  res.json({ tasks: finalTasks });
});

function getTasks() {
  return tasks;
}
app.get('/tasks', (req, res) => {
  let tasks = getTasks();
  res.json({ tasks: tasks });
});

function sortAscending(task1, task2) {
  return task1.priority - task2.priority;
}
app.get('/tasks/sort-by-priority', (req, res) => {
  let taskscopy = tasks;
  taskscopy.sort(sortAscending);
  res.json({ tasks: taskscopy });
});

// Edit task priority
function updateTheTask(task, taskIdToCheck, priority) {
  if (task.taskId === taskIdToCheck) {
    task.priority = priority;
  }
  return task;
}
app.get('/tasks/edit-priority', (req, res) => {
  let taskIdToCheck = parseInt(req.query.taskId);
  let priority = parseInt(req.query.priority);
  let updatedTasks = tasks.filter((task) =>
    updateTheTask(task, taskIdToCheck, priority)
  );
  res.json({ tasks: updatedTasks });
});

// Update the task text based on taskId
function updateTasktext(task, taskId, text) {
  if (task.taskId === taskId) {
    task.text = text;
  }
  return task;
}
app.get('/tasks/edit-text', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let tasksList = tasks.filter((task) => updateTasktext(task, taskId, text));
  res.json({ tasks: tasksList });
});
// delete the task from task based on taskId
function deleteTask(task, taskId) {
  return task.taskId != taskId;
}
app.get('/tasks/delete', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let finalTasks = tasks.filter((task) => deleteTask(task, taskId));
  res.json({ tasks: finalTasks });
});

// filter the task by priority only display the task for that priority
function filteredTask(task, priority) {
  return task.priority === priority;
}
app.get('/tasks/filter-by-priority', (req, res) => {
  let priority = parseInt(req.query.priority);
  let filtertasks = tasks.filter((task) => filteredTask(task, priority));
  res.json({ tasks: filtertasks });
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
