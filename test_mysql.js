var mysql = require('mysql');

//open only when needed - make a function and then close after
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Staffs55",
    database: "edify"
});

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
        con.connect(err => {
            if (err) { 
                reject('failed to connect')
            }
            console.log('connected');

            con.query("UPDATE user SET first_name ='" +fname+ "', last_name ='" +lname+ "' WHERE user_id = 3;"), function (err, result) {
                if (err){
                    reject("failed to update name")
                } else {
                    resolve('ok')
                }
            }
        })
    })     
}

function changeEmail(email) {
    return new Promise((resolve, reject) =>{
        con.connect(err => {
            if (err) { 
                reject('failed to connect')
            }
            console.log('connected');
            con.query("UPDATE user SET email ='" +email+ "' WHERE user_id = 3;"), function (err, result) {
                if (err){
                    reject("failed to update email")
                } else {
                    resolve('ok')
                }
            }
        })
    })     
}

function changePassword() {
    return new Promise((resolve, reject) =>{
        con.connect(err => {
            if (err) { 
                reject('failed to connect')
            }
            console.log('connected');
            con.query("UPDATE user SET password ='" +password+ "' WHERE user_id = 3;"), function (err, result) {
                if (err){
                    reject("failed to update email")
                } else {
                    resolve('ok')
                }
            }
        })
    })   
}

module.exports = {
    changeName,
    changeEmail,
    changePassword
}