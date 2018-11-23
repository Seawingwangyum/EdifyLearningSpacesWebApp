require('dotenv').config();
var mysql = require('mysql');

var con = mysql.createPool({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DBNAME,
  port: process.env.DBPORT
});


con.query("INSERT INTO user(first_name, last_name, password, email, location, is_admin) values ('fred', 'jeff', 'password', 'fred@jeff.com', 'Surrey', '0')", function (err, result) {
  if (err) throw err;
  console.log("Insert Successful");
});


con.query('SELECT * FROM user', (err,rows) => {
    if(err) throw err;
    console.log('Data received from Db:\n');
    rows.forEach( (row) => {
      console.log(`${row.first_name} is in ${row.location}`);
    });
  
  });