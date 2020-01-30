const express = require('express');

const server = express();

server.use(express.json());

const projects = [];

/* Add projects in the array (params: id, title) */
server.post('/projects', (req, res) => {
  const { id, title } = req.body;

  const project = { id: id, title: title, tasks: [] };

  projects.push(project);

  return res.json(projects);
});

/* List all projects in the array */
server.get('/projects', (req, res) => {
  return res.json(projects);
});

/* Change title project with id params */
server.put('/projects/:id', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  /* Runs through the list to find the id and changes the title of it */
  projects.forEach((project) => {
    if(project.id == id) {
      project.title = title;
    }
  });

  return res.json(projects);
});

/* Delete project with id params */
server.delete('/projects/:id', (req, res) => {
  const { id } = req.params;

  /* Runs through the list to find the id and deletes it */
  projects.forEach((project) => {
    if(project.id == id) {
      projects.splice(project, 1);
    }
  });

  return res.status(200).json("Projeto excluído com sucesso");
});

server.listen(3000);