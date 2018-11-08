
module.exports.check_password = function(info){
    var to_return = {}
    return new Promise((resolve, reject) =>{
        if(info.password.length < 8){
            to_return['error'] = 1
            reject(to_return);
        }
        else if(check_characters(info.password) == false) {
            to_return['error'] = 2;
            reject(to_return)
        }
        else if(info.password != info.passwordcheck){
            to_return['error'] = 3;
            reject(to_return);

        }
        else{
            to_return['error'] = 0;
            resolve(to_return);
        }
    })
}

function check_characters(password){
    var accept = false;
    for(i=0; i<password.length; i++){
        if(isNaN(password[i]) == false){
            accept = true;
        };
    };
    return(accept)
}