const AWS = require('aws-sdk');
const cred = require("./s3credentials")
/**
 * Downloads an S3 bucket. *Not Functional
 * @param {String} file - Name of a file.
 */
function downloadS3(file) {
    return new Promise((resolve, reject) =>{
 let s3 = new AWS.S3({
   accessKeyId: cred.IAM_USER_KEY,
   secretAccessKey: cred.IAM_USER_SECRET,
   Bucket: cred.BUCKET_NAME,
 });
   var params = {
    Bucket: cred.BUCKET_NAME,
    Key: file,
    Expires: 2000
   };
   s3.getSignedUrl('getObject', params, function (err, url) {
    if (err){
        reject(err);
    }else {
        resolve(url);
    }
    
    });
 })
}
module.exports = {
    downloadS3
}