var mysql = require('mysql');

function createConnection() {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "edify"
    });
    return con
}

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

function changeName(fname, lname) {
    return new Promise((resolve, reject) =>{
        var con = createConnection();
        connect(con)
        .then((resolved) => {
            con.connect(err => {
                
                con.query("UPDATE user SET first_name ='" +fname+ "', last_name ='" +lname+ "' WHERE user_id = 3;"), function (err, result) {
                    if (err){
                        reject(err)
                    }
                }
                con.end();
                resolve('ok')

            }), (err) => {
                reject(err)
            }
        })
    })     
}

function changeEmail(email) {
    return new Promise((resolve, reject) =>{
        var con = createConnection();
        connect(con)
        .then((resolved) => {
            con.connect(err => {
                
                con.query("UPDATE user SET email ='" +email+ "' WHERE user_id = 3;"), function (err, result) {
                if (err){
                    reject(err)
                    }
                }
                con.end();
                resolve('ok')
                
            }), (err) => {
                reject(err)
            }
        })
    })     
}

function changePassword(password) {
    return new Promise((resolve, reject) =>{
        var con = createConnection();
        connect(con)
        .then((resolved) => {
            con.connect(err => {
                
                con.query("UPDATE user SET password ='" +password+ "' WHERE user_id = 3;"), function (err, result) {
                if (err){
                    reject(err)
                    }
                }
                con.end();
                resolve('ok')

            }), (err) => {
                reject(err)
            }
        })
    })   
}

module.exports = {
    changeName,
    changeEmail,
    changePassword
}