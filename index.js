const express = require('express');
const serve = express();

serve.use(express.json());

let users = [
  { id: 1, name: "Jose" },
  { id: 2, name: "Josefina" },
  { id: 3, name: "Joselito" },
  { id: 4, name: "Josefa" }
];

serve.get('/users', function (request, response) {
  response.json(users);
});

serve.get('/users/:id', function (request, response) {
  const { id } = request.params;
  const user = users.find((u) => u.id === parseInt(id));
  if (user) {
    response.json(user);
  } else {
    response.status(404).json({ error: "User not found" });
  }
});

serve.post('/users', function (request, response) {
  const { id, name } = request.body;

  const existingUser = users.find((u) => u.name === name);
  if (existingUser) {
    response.status(400).json({ error: "El nombre ya está en uso" });
    return;
  }

  if (!name) {
    response.status(400).json({ error: "El nombre no puede estar vacío" });
    return;
  }

  const existingID = users.find((u) => u.id === parseInt(id));
  if (existingID) {
    response.status(400).json({ error: "El ID ya está en uso" });
    return;
  }

  users.push({ id, name });
  response.json({ id, name });
});

serve.put('/users/:id', function (request, response) {
  const { id } = request.params;
  const { name } = request.body;

  const user = users.find((u) => u.id === parseInt(id));
  if (user) {
    user.name = name;
    response.json(user);
  } else {
    response.status(404).json({ error: "User not found" });
  }
});

serve.delete('/users/:id', function (request, response) {
  const { id } = request.params;

  const index = users.findIndex((u) => u.id === parseInt(id));
  if (index !== -1) {
    const deletedUser = users.splice(index, 1);
    response.json(deletedUser[0]);
  } else {
    response.status(404).json({ error: "User not found" });
  }
});

serve.listen(3001, () => {
  console.log(`Server Running at 3001`);
});
