const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();
app.use(express.json());

const produtos = {};

app.get('/', (req, res) => {
    res.json({ msg: "Esta rodando!" });
});

app.get('/produtos/:id', (req, res) => {
    res.json({ produto: produtos[req.params.id] });
});

app.put('/produtos/:id', (req, res) => {
  const { id } = req.params;
  if (id && produtos[id]) {
      const produto = req.body;
      produto.id = id;
      produtos[id] = produto;
      res.json({ msg: "Produto Editado" });
  } else {
      res.status(400).json({ msg: "Produto não encontrado!" });
  }
});
app.delete('/produtos/:id', (req, res) => {
    const {id} = req.params;
    if (id && produtos[id]) {
        delete produtos[id];
        res.json({ msg: "Produto deletado com sucesso!" });
    } else {
        res.status(400).json({ msg: "Produto não encontrado!" });
    }
});

app.post('/produtos', (req, res) => {
    const produto = req.body;
    const idProduto = uuidv4();
    produto.id = idProduto;
    produtos[idProduto] = produto;
    res.json({ msg: "Produto adicionado com sucesso!" });
});

app.get('/produtos', (req, res) => {
    res.json({ produtos: Object.values(produtos) });
});


const server = app.listen(8080, () => {
  console.log("Servidor pronto na porta 8080");
});

module.exports = server;
