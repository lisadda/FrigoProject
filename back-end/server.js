const express = require('express')
const mysql = require("mysql2")
const app = express()
const port = 3001;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}/ `)
})

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'lisalisa',
  database: 'frigorecettes'
});
// Connect to MySQL
// db.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL: ' + err.stack);
//     return;
//   }
//   console.log('Connected to MySQL as ID ' + db.threadId);
// });
// // Routes
// app.get('/produits', (req, res) => {
//   db.query('SELECT * FROM produits', (err, results) => {
//     if (err) {
//       console.error('Error executing query: ' + err.stack);
//       res.status(500).send('Error fetching users');
//       return;
//     }
//     res.json(results);
//   });
// });

// app.get('/recettes', (req, res) => {
//   db.query('SELECT * FROM recettes', (err, results) => {
//     if (err) {
//       console.error('Error executing query: ' + err.stack);
//       res.status(500).send('Error fetching users');
//       return;
//     }
//     res.json(results);
//   });
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on port ${PORT}`);
// });