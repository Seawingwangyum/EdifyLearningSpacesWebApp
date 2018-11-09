module.exports.login_check = function(info){
    var to_return = {}
    console.log(info);
    return new Promise((resolve, reject) =>{
        if(info.Email === 'user' && info.Passwd === 'u'){
            to_return['error'] = 1;
            reject(to_return);
        }
        else if(info.Email === 'admin' && info.Passwd === 'a') {
            to_return['error'] = 2;
            reject(to_return)
        }
        else if(info.Email === 'super' && info.Passwd === 's'){
            to_return['error'] = 3;
            reject(to_return);

        }
        else{
            to_return['error'] = 0;
            resolve(to_return);
        }
    })
}
