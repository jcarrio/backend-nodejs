const express = require("express");
const app = express();

// Sinaliza ao Express que todo body da requisição
// estará estruturado em JSON
app.use(express.json());

app.get("/", function (req, res) {
  res.send("Olá mundo!");
});

// CRUD -> Create, Read (All & Single), Update, Delete
// "CRUD" em memória

// Lista de textos (strings)
const lista = ["Rick Sanchez", "Morty Smith"];
//             0               1

// [GET] /personagens
// Read All
app.get("/personagens", function (req, res) {
  res.send(lista.filter(Boolean));
});

// [GET] /personagens/:id
app.get("/personagens/:id", function (req, res) {
  const id = req.params.id - 1;

  const item = lista[id];

  if (!item) {
    res.status(404).send("Chave 'nome' não foi encontrada no corpo da requisição");

    return;
  }

  res.send(item);
});

// [POST] /personagens
app.post("/personagens", function (req, res) {
  // Obtém o corpo da requisição e coloca na variável item
  const item = req.body.nome;

  if (!item) {
    res.status(404).send("Chave 'nome' não foi encontrada no corpo da requisição");

    return;
  }

  lista.push(item);

  res.status(201).send("Item adicionado com sucesso");
});

// [PUT] /personagens
app.put("/personagens/:id", function (req, res) {
  const id = req.params.id - 1;
  const item = req.body.nome;

  if (!item) {
    res.status(404).send("Chave 'nome' não foi encontrada no corpo da requisição");

    return;
  }
  
  lista[id] = item;

  res.send("Personagem atualizado com sucesso");
});

// [DELETE] /personagens
app.delete("/personagens/:id", function (req, res) {
  const id = req.params.id - 1;

  delete lista[id];
  //  lista.splice(id, 1);
  // se existise (10, 50, 60), splice(1,1) deixaria (10, 60), e lista[1] seria 60, perdendo a posição

  res.send("Personagem removido com sucesso");
});

app.listen(3000);
