module.exports.verify_license = function(info){
    var to_return = {};
    console.log(info);
    return new Promise((resolve, reject)=>{
        
            if (info['file'] === null){
                console.log('YUP ITS NULL');
                to_return["Error"] = '1';
                reject(to_return)
            }
            else{
                console.log("it's verified");
                to_return["Error"] = '0';
                resolve(to_return)
            
        }
    })
}