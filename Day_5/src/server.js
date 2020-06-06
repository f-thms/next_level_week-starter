const express = require("express");
const server = express();
const db = require("./database/db.js");

//CONFIGURAR PASTA PUBLICA
server.use(express.static("public"));

//HABILITAR O USO DO req.body NA NOSSA APLICAÇÃO
server.use(express.urlencoded({ extended: true }));

//UTILIZANDO TEMPLATE ENGINE
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
  express: server,
  noCache: true,
});

//CONFIGURAR CAMINHOS DA APLICAÇÃO
//PÁGINA INICIAL
//req : Requisição
//res : Resposta
server.get("/", (req, res) => {
  return res.render("index.html", { title: "Um titulo" });
});

server.get("/create-point", (req, res) => {
  //req.query = Query String da nossa URL
  //console.log(req.query)
  return res.render("create-point.html");
});

server.post("/savepoint", (req, res) => {
  //req.body = Corpo do nosso formulário
  //console.log(req.body)

  //INSERIR DADOS NO BANCO DE DADOS
  const query = `
        INSERT INTO places (
            image,
            name, 
            adress,
            adress2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `

  const values = [
    req.body.image,
    req.body.name,
    req.body.adress,
    req.body.adress2,
    req.body.state,
    req.body.city,
    req.body.items,
  ]

  function afterInsertData(err) {
    if (err) {
      console.log(err);
      return res.render("create-point.html", {error: true})
    } 
      //console.log("Cadastrado com sucesso");
      //console.log(this);
      return res.render("create-point.html", { saved: true })
  }
  db.run(query, values, afterInsertData);
})

server.get("/search", (req, res) => {

    let incrementSearch = ""
    const search = req.query.search
    if(search != "") {
        incrementSearch = " WHERE city LIKE '%" + search + "%'"
    }

  //PEGAR OS DADOS DO BANCO DE DADOS
  db.all(`SELECT * FROM places ${incrementSearch}`, function (err, rows) {
    if (err) {
      return console.log(err);
    } 
      const total = rows.length;
      //MOSTRAR A PAGINA HTML COM OS DADOS DO BANCO DE DADOS
      return res.render("search-results.html", { places: rows, total });
  });
});

//LIGAR O SERVIDOR

server.listen(3000);
