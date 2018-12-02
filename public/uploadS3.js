const cred = require("./s3credentials")
const AWS = require('aws-sdk');

function uploadS3(file, name) {
 let s3bucket = new AWS.S3({
   accessKeyId: cred.IAM_USER_KEY,
   secretAccessKey: cred.IAM_USER_SECRET,
   Bucket: cred.BUCKET_NAME,
 });
   var params = {
    Bucket: cred.BUCKET_NAME,
    Key: name,
    Body: file,
   };
   s3bucket.upload(params, function (err, data) {
    if (err) {
     console.log('error in callback');
     console.log(err);
    }
    console.log('success');
    console.log(data);
   });
 
}
module.exports = {
	uploadS3
}