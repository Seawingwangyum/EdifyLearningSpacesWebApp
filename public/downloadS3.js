const AWS = require('aws-sdk');

function downloadS3(file) {
 let s3bucket = new AWS.S3({
   accessKeyId: cred.IAM_USER_KEY,
   secretAccessKey: cred.IAM_USER_SECRET,
   Bucket: cred.BUCKET_NAME,
 });
   var params = {
    Bucket: cred.BUCKET_NAME,
    Body: file,
   };
   s3Client.getObject(params)
        .createReadStream()
            .on('error', function(err){
                res.status(500).json({error:"Error -> " + err});
        }).pipe(res);
 
}
module.exports = {
    uploadS3
}