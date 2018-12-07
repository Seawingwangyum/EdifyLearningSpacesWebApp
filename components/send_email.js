var nodemailer = require('nodemailer')

// note gmail works the easiest

var mailservice = "";
var sender = "";
var password = "";
var reciever = "";
var subject = "";
var text = "";

/**
 * Sends an email using node mailer
 */
module.exports.send_email = function(info) {
    var transporter = nodemailer.createTransport({
        service: mailservice,
        auth: {
            user: sender,
            pass: password
        }
    });

    var mailOptions = {
        from: sender,
        to: reciever,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error)
        }
        else{
            console.elog("email sent: " + info.repsone);
        }
    })
}