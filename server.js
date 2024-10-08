const express = require('express');
const app = express();
const sql = require('mysql');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const dbConfig = {
  user: 'your_username',
  password: 'your_password',
  server: 'your_server_name',
  database: 'your_database_name',
  options: {
    encrypt: true
  }
};


const pool = new sql.ConnectionPool(dbConfig);


pool.connect(err => {
  if (err) {
    console.error('error connecting:', err);
    return;
  }
  console.log('connected');
});


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


app.get('/about', (req, res) => {
  const query = 'SELECT * FROM about';
  pool.request().query(query, (err, results) => {
    if (err) {
      console.error('error fetching about page:', err);
      return;
    }
    res.render('about', { title: results.recordset[0].title, content: results.recordset[0].content });
  });
});


app.get('/contact', (req, res) => {
  res.sendFile(__dirname + '/contact.html');
});


app.get('/report', (req, res) => {
  res.sendFile(__dirname + '/report.html');
});


app.post('/report', (req, res) => {
  const reportText = req.body.reportText;
  const location = req.body.location;
  const userId = 1; // Replace with the actual user ID

  const query = `INSERT INTO reports (user_id, report_text, location) VALUES (@userId, @reportText, @location)`;
  pool.request()
    .input('userId', sql.Int, userId)
    .input('reportText', sql.NVarChar, reportText)
    .input('location', sql.NVarChar, location)
    .query(query, (err, results) => {
      if (err) {
      console.error('error inserting report:', err);
      return;
    }
    console.log('report inserted successfully');
    res.redirect('/report');
  });
});


app.post('/contact', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;

  const query = `INSERT INTO contact (name, email, message) VALUES (@name, @email, @message)`;
  pool.request()
    .input('name', sql.NVarChar, name)
    .input('email', sql.NVarChar, email)
    .input('message', sql.NVarChar, message)
    .query(query, (err, results) => {
      if (err) {
        console.error('error inserting contact:', err);
        return;
      }
      console.log('contact inserted successfully');
      res.redirect('/contact');
    });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
