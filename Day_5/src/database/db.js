// IMPORTAR A DEPENDENCIA DO SQLITE3
const sqlite3 = require("sqlite3").verbose();

//CRIAR O OBJETO QUE IRÁ FAZER OPERAÇÕES NO BANCO DE DADOS
const db = new sqlite3.Database("./src/database/database.db");

//UTILIZAR O OBJETO DE BANCO DE DADOS PARTA NOSSAS OPERAÇÕES
db.serialize(() => {
  //CRIAR UMA TABELA
  db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            adress TEXT,
            adress2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        )
     `);

  //DELETAR UM DADO DA TABELA
//   db.run(`DELETE FROM places WHERE id = ?`, [1], function (err) {
//     if (err) {
//       return console.log(err);
//     }
//     console.log("Cadastro deletado com sucesso");
//   });
});

module.exports = db;
