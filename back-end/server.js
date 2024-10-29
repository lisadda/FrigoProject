const express = require('express')
const mysql = require("mysql2")
const cors = require ("cors")
const app = express()
app.use(cors());
const port = 3093;
// const sql =
//   'INSERT INTO `users`(`name`, `age`) VALUES ("Josh", 19), ("Page", 45)';

// db.query(sql, (err, result, fields) => {
//   if (err instanceof Error) {
//     console.log(err);
//     return;
//   }

//   console.log(result);
//   console.log(fields);
// });

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// app.listen(port, () => {
//   console.log(`Example app listening on port http://localhost:${port}/ `)
// })

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'lisalisa',
  database: 'frigorecettes',
});

//Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as ID ' + db.threadId);
});

app.get('/produits', (req, res) => {
  db.query('SELECT * FROM produits', (err, results, fields) => {
      console.log('Oups, Erreur', err);
      console.log('Voici le résultat', results);
      console.log('Voici mes champs', fields);
      res.send(results);
    }); 
  });

  app.get('/recettes', (req, res) => {
      db.query('SELECT * FROM recettes', (err, results, fields) => {
      console.log('Oups, Erreur', err);
      console.log('Voici le résultat', results);
      console.log('Voici mes champs', fields);
      res.send(results);
    }); 
  });

// app.get('/recettes', (req, res) => {
//   db.query('SELECT * FROM recettes', (err, results, fields) => {
//       console.log('Oups, Erreur', err);
//       console.log('Voici le résultat', results);
//       console.log('Voici mes champs', fields);
//       res.send(results);
//     });
//   });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});