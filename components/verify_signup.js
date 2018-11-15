module.exports.verify_signup = function(info){
    var to_return = {};
    return new Promise((resolve, reject)=>{
        for(var key in info){
            if (info[key] === ""){
                to_return["Error"] = '1';
                reject(to_return)
            }
            else{
                to_return["Error"] = '0';
                resolve(to_return)
            }
        }
    })
}