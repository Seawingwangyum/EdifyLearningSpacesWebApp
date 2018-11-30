var mysql = require('mysql');
/**
 * Creates a connection to the database.
 * @returns {array} con - connection details
 */
function createConnection() {
    var con = mysql.createConnection({
        connectionLimit : 100,
        host     : '54.202.177.36',
        port     :  3306,
        user: "edifyuser",
        password: "EdifyPassword1!",
        database: "edify"
    });
 
    return con
 
 }

 module.exports = {
    createConnection
}