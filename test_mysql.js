var mysql = require('mysql');

/**
 * Creates a connection to the database.
 * @returns {array} con - connection details
 */
function createConnection() {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
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
    return new Promise((resolve, reject) => {
        con.connect(err => {
            if (err) {
                reject(err)
            } else {
                resolve();
            }
        })
    })
}
// Now broken
function addUser() {
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");

        con.query("INSERT INTO user(first_name, last_name, password, email, location, is_admin) values ('fred', 'jeff', 'password', 'fred@jeff.com', 'Surrey', '0')", function(err, result) {
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
    return new Promise((resolve, reject) => {
        var con = createConnection();
        connect(con)
            .then((resolved) => {
                con.connect(err => {

                    con.query("UPDATE user SET first_name ='" + fname + "', last_name ='" + lname + "' WHERE user_id = 3;"),
                        function(err, result) {
                            if (err) {
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

/**
 * Sends a query to the database to update email.
 * @param {string} email.
 * @returns {Promise} returns "ok".
 */
function changeEmail(email) {
    return new Promise((resolve, reject) => {
        var con = createConnection();
        connect(con)
            .then((resolved) => {
                con.connect(err => {

                    con.query("UPDATE user SET email ='" + email + "' WHERE user_id = 3;"),
                        function(err, result) {
                            if (err) {
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

/**
 * Sends a query to the database to update password.
 * @param {string} password.
 * @returns {Promise} returns "ok".
 */
function changePassword(password) {
    return new Promise((resolve, reject) => {
        var con = createConnection();
        connect(con)
            .then((resolved) => {
                con.connect(err => {

                    con.query("UPDATE user SET password ='" + password + "' WHERE user_id = 3;"),
                        function(err, result) {
                            if (err) {
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

function addLicense(file, type, notes, user_id) {
    return new Promise((resolve, reject) => {
        var con = createConnection();
        connect(con)
            .then((resolved) => {
                con.connect(err => {
                    console.log('add license is connected!');
                    con.query("INSERT INTO license(file, type, user_notes, frn_user_id) values ('"+file+"', '" + type + "', '" + notes + "', " + user_id +")"),
                        function(err, result) {
                            if (err) {
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

function getLicense(license_id) {
    return new Promise((resolve, reject) => {
        var con = createConnection();
        connect(con)
            .then((resolved) => {
                con.connect(err => {
                    console.log('get license is connected!');
                    con.query("select * from license where license_id = "+ license_id + ";"),
                        function(err, result) {
                            if (err) {
                                console.log('it didnt work');
                                reject(err)
                            }
                            console.log(result);
                            con.end();
                            resolve(result)
                        }
                    
                    

                }), (err) => {
                    reject(err)
                }
            })
    })
}


function retrievelicenses(user_id) {
    status_data = {}
    return new Promise((resolve, reject) =>{
        var con = createConnection();
        connect(con)
        .then((resolved) => {
            con.connect(err => {
                
                con.query("SELECT * FROM license WHERE frn_user_id = " + user_id + ";", function (err, result) {
                    if (err){
                        reject(err)
                        }
                    con.end();
                    for(i = 0; i < result.length; i++){
                        status_data[result[i].type] = [result[i].status] 
                    }
                    resolve(status_data)
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
    retrievelicenses,
    getLicense,
    addLicense
}
