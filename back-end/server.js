const express = require('express')
const mysql = require("mysql2")
const cors = require ("cors")
const bodyparser = require('body-parser')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { MongoClient, ServerApiVersion, ListCollectionsCursor, ObjectId } = require('mongodb');
const uri = "mongodb+srv://lisaboug:TcVG0MAT6OlYVN1H@cluster0.1xudb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
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

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
    AfficherLesCollections();
    DeletedUserInsteadOne();
  }
}
run().catch(console.dir);

async function AfficherLesCollections() {
  const dbName = "sample_mflix";
  const db = client.db(dbName);
  db.listCollections()
    .toArray()
    .then((cols) =>
      cols.map((col, index) => {
      console.log(`Collections ${index} : `, col.name)
  }))
}

//supprime tous les users sauf 1
// async function DeletedUserInsteadOne(){
//   const dbName = "sample_mflix";
//   const db = client.db(dbName);
//   const usersCollection = db.collection("users");
//   const req = { _id: { $ne: ObjectId("59b99db4cfa9a34dcd7885b6") } }
//   const result = await usersCollection.deleteMany(req);
//   console.log(result)
//   // db.users.deleteMany({ _id: { $ne: ObjectId("59b99db4cfa9a34dcd7885b6") } } )
// }

// supprime tous les users sauf 1
async function GetIfOfAnUser(emailOfUser){
  const db = SelectGoodDB("sample_nflix");
  const usersCollection = db.collection("users");
  const req = { email: emailOfUser }
  const result = await usersCollection.findOne(req);
  console.log("MonUser", result._id)
  return result.id
  // db.users.deleteMany({ _id: { $ne: ObjectId("59b99db4cfa9a34dcd7885b6") } } )
}


app.post("/inscription", async (req, res) => {
  const {name, email, password} = req.body;
  console.log("req body", req.body)
  const db = SelectGoodDB("sample_nflix")
  const usersCollection = db.collection ("users");
  const passwordHashed = bcrypt.hash(password, saltRounds, function(err, hash) {});
  const result = await usersCollection.insertOne({name, email, passwordHashed})
  console.log(result)
  return res.send("Utilisation crée avec sucess!")
})

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