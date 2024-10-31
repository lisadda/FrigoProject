const express = require('express')
const mysql = require("mysql2")
const cors = require ("cors")
const bodyparser = require('body-parser')
const app = express()
app.use(cors());
const port = 3093;
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})


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
      // console.log('Oups, Erreur', err);
      // console.log('Voici le résultat', results);
      // console.log('Voici mes champs', fields);
      res.send(results);
    }); 
  });

  app.get('/recettes', (req, res) => {
      db.query('SELECT * FROM recettes', (err, results, fields) => {
      // console.log('Oups, Erreur', err);
      // console.log('Voici le résultat', results);
      // console.log('Voici mes champs', fields);
      res.send(results);
    }); 
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.post('/ajouterproduits', (req, res) => {
  const { nom, quantite, date_expiration, categorie } = req.body;
  console.log(nom, quantite, date_expiration, categorie);
  db.query(`INSERT INTO produits (nom, quantite, date_expiration, categorie) VALUES ('${nom}', '${quantite}', '${date_expiration}' , '${categorie}')`,
    function (err, results, fields) {
      console.log("Resultats", results, err, fields);
      res.send('Post request to ajouter produit');
    }
  );
});

app.post('/ajouterrecettes', (req, res) => {
  const { nom, instructions, difficulte, temps_preparation, ingredients } = req.body;
  console.log(nom, instructions, difficulte, temps_preparation, ingredients);
  db.query(
    `INSERT INTO recettes (nom, instructions, difficulte, temps_preparation) VALUES ('${nom}', '${instructions}', '${difficulte}', '${temps_preparation}') `,
    function (err, results, fields) {
      console.log("Resultats", results, err, fields);
      res.send('Post request to ajouter recette');
    }
  );
});