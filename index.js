const express = require('express');

const server = express();

server.use(express.json());

const projects = [];

function checkIfProjectExists(req, res, next) {
  const { id } = req.params;

  const project = projects.find(p => p.id == id);

  if(!project) {
    return res.status(400).json("Project doesn't exists.");
  }

  return next();
}

function logRequests(req, res, next) {
  console.count("Request Count");

  return next();
}

server.use(logRequests);

server.post('/projects', (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(project);
});

server.get('/projects', (req, res) => {
  return res.json(projects);
});

server.put('/projects/:id', checkIfProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(project);
});

server.delete('/projects/:id', checkIfProjectExists, (req, res) => {
  const { id } = req.params;

  const project = projects.find(p => p.id == id);

  projects.splice(project, 1);

  return res.status(200).json("Projeto excluído com sucesso.");
});

server.post('/projects/:id/tasks', checkIfProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.tasks.push(title);

  return res.json(project);
});

server.listen(3000);