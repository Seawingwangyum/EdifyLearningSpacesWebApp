//forgot_pass_modules
var mysql = require('mysql');
var nodemailer = require('nodemailer');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');
var bcrypt2 = require('bcrypt');
var async = require('async');
var crypto = require('crypto');

var bcrypt2 = require('bcrypt');

const port = process.env.port || 8080;
const express = require('express');
//forgot_pass
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');

const hbs = require('hbs');
const fs = require('fs');
const session = require('client-sessions');
const fileUpload = require('express-fileupload');

const app = express();

const send_email = require("./components/send_email")
const verify_signup = require("./components/verify_signup");
const check = require("./public/credentialErrorChecking");
const verify_license = require("./components/verify_license");
const db = require('./test_mysql.js')

app.set('view engine', 'hbs')
hbs.registerPartials(__dirname + '/views/partials')
app.use(express.static(__dirname + '/css'))
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/fonts'));
app.use(express.static('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads'));

app.use(express.static(__dirname + '/node_modules/sweetalert2/dist'))
//forgot_pass
app.use(logger('dev'));
app.use(cookieParser());
app.use(fileUpload());

// bodyparser setup
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded ({
    extended: true
}));
app.use(bodyParser.json())

// creates a session
app.use(session({
    cookieName: 'session',
    secret: 'edify_apple_sauce',
    duration: 1 * 60 * 60 * 1000,
    activeDuration: 1 * 30 * 60 * 1000
}));

var testData = require('./public/testData')

// Checks to see if the session is still active, if it isnt it redirects to '/landing_page'
function userSessionCheck(req, res, next) {
    console.log('user session');
    console.log(req.session.user);
    if (req.session.user.admin === 0) {
        next()
    } else {
        res.redirect('/landing_page')
    }
}

function adminSessionCheck(req, res, next) {
    console.log('admin session');
    if (req.session.user.admin === 1) {
        next()
    } else {
        res.redirect('/landing_page')
    }
}

function superSessionCheck(req, res, next) {
    console.log('super session');
    if (req.session.user.admin === 2) {
        next()
    } else {
        res.redirect('/landing_page')
    }
}

function filterList(list, id, fname, lname, status) {
    var filteredList = list;
    if (id != '') {
        filteredList = list.filter(provider => provider.id == id);
        console.log(1, filteredList);
    } if (fname != '') {
        filteredList = filteredList.filter(provider => provider.firstName == fname);
        console.log(2, filteredList);
    } if (lname != '') {
        filteredList = filteredList.filter(provider => provider.lastName == lname);
        console.log(3, filteredList);
    } if (status != '' && status != null) {
        if (status != 'all') {
            filteredList = filteredList.filter(provider => provider.status == status);
        }
    }
    return filteredList
}

app.get('/status', userSessionCheck, (request, response) => {
    response.render('status.hbs', {
        title: 'Status Page',
        userData1: testData.provider_list_data.providers[3],
        userData2: testData.provider_list_data.providers[6],
        userData3: testData.provider_list_data.providers[0],
        userData4: testData.notes
    });
});

app.post('/status', (req, res) => {
   
    var id = req.session.user.id;
    console.log(id)
   db.retrievelicenses(id).then((resolved)=>{
       //console.log(resolved)
        res.send(resolved)
   },(error)=>{
       console.log(error)
   })
});

app.get('/settings', userSessionCheck, (request, response) => {
    response.render('settings.hbs', {
        userData: testData.user_data
    });
});

app.post('/settings_name', (req, res) => {
    // send user id aswell instead of hardcode it.
    var fname = req.body.fname
    var lname = req.body.lname
    var name = [fname, lname]

    if (check.checkForBlankEntry(name) && check.checkForOnlyAlphabet(name)) {
        db.changeName(fname, lname)
        .then((resolved) => {
            res.send(resolved)
        }).catch ((error) => {
            res.sendStatus(500)
            console.log(error);
        })
    }
});

app.post('/settings_email', (req, res) => {
    // send user id as well instead of hardcode it
    var newEmail = req.body.email
    if (check.checkForBlankEntry([newEmail]) && check.checkForEmailFormat(newEmail)) {
        db.changeEmail(newEmail)
        .then((resolved) => {
            send(resolved)
        }).catch ((error) => {
            res.sendStatus(500)
            log(error);
        })
    }
});

app.post('/settings_password', (req, res) => {
    // send user id as well instead of hardcode it
    var newPassword = req.body.password
    if (check.checkForBlankEntry([newPassword]) && check.checkForPasswordFormat(newPassword)) {
        db.changePassword(newPassword)
        .then((resolved) => {
            res.send(resolved)
        }).catch ((error) => {
            res.sendStatus(500)
            console.log(error);
        })
    }
});

app.get('/provider_edit', adminSessionCheck, (req, res) => {
	res.render('provider_edit.hbs', {
		userData: testData.provider_edit_data
	})
});

app.get('/landing_page', (req, res) => {
	res.render('landing_page.hbs')
});

app.get('/pass_recovery', (req, res) => {
    res.render('pass_recovery.hbs')
});

app.get('/edify_quiz', (req, res) => {
    res.render('edify_quiz.hbs')
});

app.get('/requirements', (req, res) => {
	res.render('requirements.hbs')
});

/*
app.get('/ad_page', (req, res) => {
	res.render('ad_page.hbs')
});
*/

app.get('/login', (req, res) => {
    res.render('login.hbs')
});

app.post('/login', (req, res) => {
    db.getUser(req.body.Email, req.body.Passwd).then((resolved) => {
        var user = resolved
        console.log(user);
        req.session.user = user;
        if (user.admin === 0) {
            res.redirect('/licenses')
        } else if (user.admin === 1) {
            res.redirect('/provider_list')
        } else if (user.admin === 2) {
            res.redirect('/admin_list')
        }
    }).catch ((error) => {
        console.log(error)
        res.redirect('/login')
    })
});
 
app.get('/tandp', (req, res) => {
    res.render('terms.hbs')
});


app.get('/logout', (req, res) => {
    req.session.reset();
    res.redirect('/landing_page');
});

app.get('/licenses', (req, res) => {
	res.render('license.hbs')
});

app.post('/licenses', (req, res) => {
    if (Object.keys(req.files).length == 0) {
    return res.status(400).send('No files were uploaded.');
  }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.pic;
    console.log(req.files);

    crypto.pseudoRandomBytes(16, function(err, raw) {
        if (err) return callback(err);
        var filename = raw.toString('hex') + path.extname(req.files.pic.name);

        verify_license.verify_license(req.body).then((data) => {

            sampleFile.mv('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/'+ filename, function(err) {

                if (err) {

                res.status(500).send(err);
                }
                
            });
        db.addLicense(filename, req.body.type, req.body.notes, 1)
            .then((resolved) => {
                res.send('File uploaded!');
            }, (error) => {
                res.sendStatus(500)
                console.log(error);
            })
        }, (error) => {
            res.send(error)
        })
    })
    });




app.get('/test', (req, res) => {
    db.getLicense(2).then(function(resolved) {
        console.log(resolved);

        res.render('test.hbs', {
        //license: testData.provider_list_data
    })
    })
    
});

app.get('/account_creation', (req, res) => {
	res.render('account_creation.hbs')
});
app.post('/account_creation', (req, res) => {

    
    console.log(req.body);
    //send_email.send_email();
    verify_signup.verify_signup(req.body).then((data) =>{
        console.log('data:' + JSON.stringify(data));
        bcrypt2.genSalt(10, function(err, salt) {
            if (err) return next(err);
            bcrypt2.hash(req.body.password, salt, function(err, hash) {
                if (err) return next(err);
                req.body.password = hash; 
                console.log(req.body.password);
                //console.log(req.body.password.length)
                db.addUser(req.body)
                .then((resolve)=>{

                }, (error) =>{
                    console.log(error)
                })
            res.send(data)
        });
    });
        
    }, (error) =>{
        res.send(error)
    })
})

app.get('/passchange', (req, res)=>{
    res.render('PassChange_window.hbs')
});

app.get('/deleteaccount', (req, res)=>{
    res.render('accountdelete.hbs')
})

app.get('/provider_list', adminSessionCheck, (req, res, list) => {
	res.render('provider_list.hbs', {
        userData: testData.provider_list_data
    })
})

app.post('/provider_list', (req, res) => {
    var id = req.body.Idsearch
    var fname = req.body.fnamesearch
    var lname = req.body.lnamesearch
    var status = req.body.querytype
    var list = testData.provider_list_data.providers;

    var filteredList = {providers: filterList(list, id, fname, lname, status)}
    res.render('provider_list.hbs', {
        userData: filteredList
    })
});

app.get('/admin_list', superSessionCheck, (req, res) => {
    res.render('admin_list.hbs', {
        userData: testData.admin_list_data
    })
})

app.post('/admin_list', (req, res) => {
    var id = req.body.Idsearch
    var fname = req.body.fnamesearch
    var lname = req.body.lnamesearch
    var status = req.body.querytype
    var list = testData.admin_list_data.admins;

    var filteredList = {admins: filterList(list, id, fname, lname, status)}
    res.render('admin_list.hbs', {
        userData: filteredList
    })
});

app.get('/admin_edit', superSessionCheck, (req, res) => {
    res.render('admin_edit.hbs', {
        userData: testData.admin_edit_data
    })
});

app.get('/quizresults', (request, response) => {
    /**
     * Displays the status page
     */

    response.render('quizresults.hbs', {
        title: 'Quiz Page'
    });
});

app.listen(process.env.PORT || 8080, () => {
    console.log(`server up on port ${port}`)
});



//forgot_pass
app.post('/pass_forgot', function(req, res, next) {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
/**
    function(token, done) {
      User.findOne({ email: req.body.email }, function(err, user) {
        if (!user) {
          req.flash('error', 'No account with that email address exists.');
          return res.redirect('/pass_forgot');
        }
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
**/
    /**
     * Function that provides a unique token to a user through e-mail
     * for the purposes of password recovery.
     * @param  {string}   token [unique token that is sent to user email]
     * @param  {string}   user  [user that the email will be sent to]
     * @param  {Function} done  [confirmation that email was sent]
     * @return {Function}       [redirects user to password change page after clicking email link]
     */
    function(token, user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'edifyprovidersreset@gmail.com',
          pass: 'EdifySpaces'
        }
      });
      var mailOptions = {
        to: 'edifyprovidersreset@gmail.com',
        from: 'edifyprovidersreset@gmail.com',
        subject: 'Edify Providers Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your Edify Providers account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/landing_page\n' /**+ token + '\n\n'**/ + 
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        console.log('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
        //done(err, 'done');
      });
    }
  ], function(err) {
    if (err) return next(err);
    res.redirect('/landing_page');
  });
});
