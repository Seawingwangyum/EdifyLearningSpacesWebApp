require('dotenv').config();
var mysql = require('mysql');

var con = mysql.createPool({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DBNAME,
  port: process.env.DBPORT
});

/**
* Creates a connection to the database.
* @returns {array} con - connection details
*/
function createConnection() {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Password",
        database: "edify"
    });
    return con
}

/**
* Connects to the database.
* @param {array} con - connection details.
* @returns {Promise} returns void.
*/
function connect(con) {
    return new Promise((resolve, reject) =>{
        con.connect(err => {
            if (err) { 
                reject(err)
            } else {
                resolve();
            }
        })
    })
}

/**
* Sends a query to the database to get the users info.
* @param {string} email.
* @param {string} password.
* @returns {Promise} returns "ok".
*/
function getUser(email, password) {
    return new Promise ((resolve,reject) => {
        var con = createConnection()
        connect(con)
        .then((resolved) => {

            con.query("SELECT * FROM user WHERE email = '"+email+"' AND password = '"+password+"'", function (err, row) {
                if (err){
                    reject(err)
                }
                if (row.length > 0) {
                    var user = {id: row[0].user_id, fname: row[0].first_name, lname: row[0].last_name, email: row[0].email, admin: row[0].is_admin}
                    resolve(user);
                } else {
                    reject('Email not found!')
                }      
            })
            con.end();
        }), (err) => {
            reject(err)
        }
    })    
}

// Now broken
function addUser() {
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");

        con.query("INSERT INTO user(first_name, last_name, password, email, location, is_admin) values ('fred', 'jeff', 'password', 'fred@jeff.com', 'Surrey', '0')", function (err, result) {
            if (err) throw err;
            console.log("Insert Successful");
    	})
    });
}

/**
* Sends a query to the database to update first and last name.
* @param {string} fname - First name.
* @param {string} lname - Last name.
* @returns {Promise} returns "ok".
*/
function changeName(fname, lname) {
    return new Promise((resolve, reject) =>{
        var con = createConnection();
        connect(con)
        .then((resolved) => {
            con.connect(err => {
                
                con.query("UPDATE user SET first_name ='" +fname+ "', last_name ='" +lname+ "' WHERE user_id = 3;", function (err, result) {
                    if (err){
                        reject(err)
                    }
                    con.end();
                    resolve('ok')
                })
            }), (err) => {
                reject(err)
            }
        })
    })     
}

/**
* Sends a query to the database to update email.
* @param {string} email.
* @returns {Promise} returns "ok".
*/
function changeEmail(email) {
    return new Promise((resolve, reject) =>{
        var con = createConnection();
        connect(con)
        .then((resolved) => {
            con.connect(err => {
                
                con.query("UPDATE user SET email ='" +email+ "' WHERE user_id = 3;", function (err, result) {
                    if (err){
                        reject(err)
                        }
                    con.end();
                    resolve('ok')
                })
            }), (err) => {
                reject(err)
            }
        })
    })     
}

/**
* Sends a query to the database to update password.
* @param {string} password.
* @returns {Promise} returns "ok".
*/
function changePassword(password) {
    return new Promise((resolve, reject) =>{
        var con = createConnection();
        connect(con)
        .then((resolved) => {
            con.connect(err => {
                
                con.query("UPDATE user SET password ='" +password+ "' WHERE user_id = 3;", function (err, result) {
                    if (err){
                        reject(err)
                        }
                    con.end();
                    resolve('ok')
                })
            }), (err) => {
                reject(err)
            }
        })
    })   
}


function changeStatus(status, notes) {
    return new Promise((resolve, reject) =>{
        var con = createConnection();
        connect(con)
        .then((resolved) => {
            con.connect(err => {
                
                con.query("UPDATE license SET status ='" +status+ "' WHERE license_id = 12345;", function (err, result) {
                    if (err){
                        reject(err)
                        }
                    con.end();
                    resolve('ok')
                }),

                con.query("UPDATE license SET admin_notes ='" +notes+ "' WHERE license_id = 12345;", function (err, result) {
                    if (err){
                        reject(err)
                        }
                    con.end();
                    resolve('ok')
                })
            }), (err) => {
                reject(err)
            }
        })
    })   
}

function getFile() {
    con.connect(function(err) {
        if (err) throw err;

        console.log(con.query("SELECT file FROM license WHERE license_id = 12345;", function (err, result) {
            if (err) throw err;
        }))
    });
}

// should put array of id?
function loadStatus(id) {
     return new Promise((resolve, reject) =>{
        var con = createConnection();
        connect(con)
        .then((resolved) => {
            con.connect(err => {
                //need a for loop

                con.query("SELECT type, status, admin_notes FROM license WHERE license_id ="+id +";", function (err, result) {
                
            if (err){
                        reject(err)
                        }
                    con.end();
                    var status = {type: result[0].type, status: result[0].status, admin_notes: result[0].admin_notes}
                    resolve(status)
                })
            }), (err) => {
                reject(err)
            }
        })
    })   
}


module.exports = {
    getUser,
    changeName,
    changeEmail,
    changePassword,
    changeStatus,
    loadStatus,
    //getFile
}