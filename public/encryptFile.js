var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';
var fs = require('fs');
var zlib = require('zlib');


module.exports.encryptFile = function(filename) {
    // input file
    var r = fs.createReadStream(filename);
    // zip content
    var zip = zlib.createGzip();
    // encrypt content
    var encrypt = crypto.createCipher(algorithm, password);
    // decrypt content

    // start pipe
    r.pipe(zip).pipe(encrypt)
}


module.exports.decryptFile = function(filename) {
	var r = fs.createReadStream(filename);
	var decrypt = crypto.createDecipher(algorithm, password)
	// unzip content
	var unzip = zlib.createGunzip();
	
}