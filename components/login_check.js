//not used

const data = require("./userData");


module.exports.login_check = function(info) {
    var to_return = {}
    console.log(info);
    return new Promise((resolve, reject) => {
        for (i = 0; i < data.users.length; i++) {

            // console.log(info.Email);
            // console.log(data.users[i].username);
            // console.log(info.Passwd);
            // console.log(data.users[i].password);
            // console.log(data.users[i].is_admin);
            if (info.Email == data.users[i].username && info.Passwd == data.users[i].password && data.users[i].is_admin == 0) {
                to_return['error'] = 1;
                reject(to_return);
                break
            } else if (info.Email == data.users[i].username && info.Passwd == data.users[i].password && data.users[i].username == 'super') {
                to_return['error'] = 3;
                reject(to_return);
                break
            } else if (info.Email == data.users[i].username && info.Passwd == data.users[i].password && data.users[i].is_admin == 1) {
                to_return['error'] = 2;
                reject(to_return)
                break
            } else {
                to_return['error'] = 0;
                resolve(to_return);
            }
        }

    })
}