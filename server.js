var mysql = require('mysql');
var crypto = require('crypto');
var bcrypt2 = require('bcrypt');

const port = process.env.port || 8080;
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const AWS = require('aws-sdk');

const hbs = require('hbs');
const fs = require('fs');
const session = require('client-sessions');
const fileUpload = require('express-fileupload');
const app = express();

const send_email = require("./components/send_email")
const verify_signup = require("./components/verify_signup");
const check = require("./public/credentialErrorChecking");
const verify_license = require("./components/verify_license");
const uploadS3 = require("./public/uploadS3");
const downloadS3 = require("./public/downloadS3");
const db = require('./test_mysql.js')

app.set('view engine', 'hbs')
hbs.registerPartials(__dirname + '/views/partials')
app.use(express.static(__dirname + '/css'))
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/fonts'));
app.use(express.static('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads'));

app.use(express.static(__dirname + '/node_modules/sweetalert2/dist'))
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

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Checks to see if the session is still active, if it isnt it redirects to '/landing_page'
function userSessionCheck(req, res, next) {
    console.log(req.session.user);
    if (req.session.user.admin === 'user') {
        next()
    } else {
        res.redirect('/landing_page')
    }
}

function adminSessionCheck(req, res, next) {
    if (req.session.user.admin === 'admin') {
        next()
    } else {
        res.redirect('/landing_page')
    }
}

function superSessionCheck(req, res, next) {
    if (req.session.user.admin === 'owner') {
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
    db.retrievelicenses(request.session.user.id)
    .then((resolved) => {
        console.log(resolved);
        response.render('status.hbs', {
            fireplanStatus: resolved['fireplan'].status,
            fireplanNotes: resolved['fireplan'].admin_notes,
            criminalStatus: resolved['criminal'].status,
            criminalNotes: resolved['criminal'].admin_notes,
            siteplanStatus: resolved['siteplan'].status,
            siteplanNotes: resolved['siteplan'].admin_notes,
            refStatus: resolved['reference'].status,
            refNotes: resolved['reference'].admin_notes,
            floorplanStatus: resolved['floorplan'].status,
            floorplanNotes: resolved['floorplan'].admin_notes,
        })
    }).catch((error) => {
        console.log(error);
        response.send('error')
    });
});

app.post('/status', (req, res) => {
    db.retrievelicenses(req.session.user.id)
    .then((resolved) =>{
        res.send(resolved)
    }).catch((error) => {
        console.log(error);
        response.send('error');
    });
});


app.get('/provider_edit', adminSessionCheck, (request, response) => {
    var id = request.query.user_id
    db.retrievelicenses(id)
    .then((resolved) => {
        // required json structure for provider edits hbs
        var sortedProviderLicenses = {
            licenses: {
                awaitingApproval: {
                    name: 'Awaiting approval',
                    licenses: []
                },
                approved: {
                    name: 'Approved',
                    licenses: []
                },
                denied: {
                    name: 'Denied',
                    licenses: []
                },
                awaitingSubmission: {
                    name: 'Awaiting submission',
                    licenses: []
                },
            }
        }
        // pushes the licenses into one of the license lists based on the status
        for (key in resolved) {
            console.log(resolved[key]);
            if (resolved.hasOwnProperty(key)) {
                if(resolved[key].status === 'Awaiting Approval') {
                    sortedProviderLicenses.licenses.awaitingApproval.licenses.push(resolved[key]);
                } else if (resolved[key].status === 'Accepted') {
                    sortedProviderLicenses.licenses.approved.licenses.push(resolved[key]);
                } else if (resolved[key].status === 'Denied') {
                    sortedProviderLicenses.licenses.denied.licenses.push(resolved[key]);
                } else if (resolved[key].status === 'submission is required') {
                    sortedProviderLicenses.licenses.awaitingSubmission.licenses.push(resolved[key]);
                }
            }
        }

        // console.log(sortedProviderLicenses);
        // console.log(sortedProviderLicenses.licenses.awaitingApproval);
        response.render('provider_edit.hbs', {
            id: id,
            fname: request.query.fname,
            lname: request.query.lname,
            status: request.query.status,
            userData: sortedProviderLicenses
        })
    }).catch((error) => {
        console.log(error);
        response.send('error');
    })
});

app.post('/provider_edit', adminSessionCheck, (request, response) => {
    console.log(response);
    response.header("Access-Control-Allow-Origin", "*");
    // response.send(JSON.stringify(request.body))
    // console.log('heeeelp');
    console.log(request.body.L_ID);
    console.log(request.body.Action);
    console.log(request.body.notesValue);
    console.log(request.body.filename);
    if (request.body.Action) {
        db.changeStatus(request.body.L_ID, request.body.Action, request.body.notesValue)
        .then((resolved) => {
            response.send(resolved)
        }, (error) => {
            response.sendStatus(500)
            console.log(error);
        })
    } else if (request.body.filename) {
        db.getLicensePic(request.body.L_ID)
        .then((resolved) => {
            console.log('file is:' + resolved);
            downloadS3.downloadS3(resolved)
            .then((url) => {
                console.log(url);
            response.redirect(url)
            }, (err) => {
                response.sendStatus(500)
                console.log(error);
            });
            
        }, (error) => {
            response.sendStatus(500)
            console.log(error);
        })
    } else {
        alert('Something went wrong')
    }
    

});

app.get('/settings', userSessionCheck, (req, res) => {
    res.render('settings.hbs', {
        name: req.session.user.fname + ' ' + req.session.user.lname,
        email: req.session.user.email
    });
});

app.post('/settings_name', (req, res) => {
    var fname = req.body.fname
    var lname = req.body.lname
    var name = [fname, lname]
    var id = req.session.user.id

    if (check.checkForBlankEntry(name) && check.checkForOnlyAlphabet(name)) {
        db.changeName(fname, lname, id)
        .then((resolved) => {
            req.session.user.fname = fname;
            req.session.user.lname = lname;
            res.send(resolved);
        }).catch ((error) => {
            res.sendStatus(500)
            console.log(error);
        })
    }
});

app.post('/settings_email', (req, res) => {
    var newEmail = req.body.email
    var id = req.session.user.id

    if (check.checkForBlankEntry([newEmail]) && check.checkForEmailFormat(newEmail)) {
        db.changeEmail(newEmail, id)
        .then((resolved) => {
            req.session.user.email = newEmail;
            res.send(resolved);
        }).catch ((error) => {
            res.sendStatus(500);
            console.log(error);
        })
    }
});

app.post('/settings_password', (req, res) => {
    var newPassword = req.body.password
    var id = req.session.user.id
    bcrypt2.genSalt(10, function(err, salt) {
        if (err) return next(err);
        bcrypt2.hash(newPassword, salt, null, function(err, hash) {
            if (err) return next(err);
            req.body.password = hash; 
            //console.log(req.body.password);
            //console.log(req.body.password.length)
            db.changePassword(newPassword, id)
            .then((resolved) => {
                res.send(resolved);
            }).catch ((error) => {
                res.sendStatus(500);
                console.log(error);
            })
                    
             
            });
    });
        
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
    if(res) {
        console.log('stuff is happene');
        db.getUser(req.body.Email).then((resolved) => {
            console.log('resolve'+ resolved.password);
        
            bcrypt2.compare(req.body.Passwd, resolved.password, function(err, rest) {
                console.log(rest);
                if (err){
                    console.log('compare is bad ' + err);
                }
                else {
                    console.log('yoooooo');
                    var user = resolved;
                    console.log(user);
                    req.session.user = user;
                    if (user.admin === 'user') {
                        res.redirect('/licenses')
                    } else if (user.admin === 'admin') {
                        res.redirect('/provider_list')
                    } else if (user.admin === 'owner') {
                        res.redirect('/admin_list')
                    }
                } 
            })
            
        }).catch ((error) => {
            console.log('db is bad' + error)
            res.redirect('/login')
        })
    } else {
        console.log('login is bad ' + err);
    } 
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
  
    if (req.files == undefined) {
        return res.status(400).send('No files were uploaded.');
    } else {
        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        let sampleFile = req.files.pic;
        console.log(req.files);

        crypto.pseudoRandomBytes(16, function(err, raw) {
            if (err) return callback(err);
            var filename = raw.toString('hex') + path.extname(req.files.pic.name);

            verify_license.verify_license(req.body).then((data) => {
                uploadS3.uploadS3(req.files.pic.data, filename, function(err){
                    if (err){
                        console.log('s3 is bad: ' + err);
                    }
                })
                sampleFile.mv('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/'+ filename, function(err) {

                    if (err) {

                    res.status(500).send(err);
                    }
                    
                });
            db.addLicense(filename, req.body.type, req.body.notes, req.session.user.id)
                .then((resolved) => {
                    res.redirect('/status');
                }, (error) => {
                    res.sendStatus(500)
                    console.log(error);
                })
            }, (error) => {
                res.send(error)
            })
        }) 
    }
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
    if(req.body.type =="check_email"){
        db.check_email(req.body)
        .then((resolved) =>{
            res.send(resolved)
        })
    }
    else{

            //send_email.send_email();
    verify_signup.verify_signup(req.body).then((data) =>{
        console.log('data:' + JSON.stringify(data));
        bcrypt2.genSalt(10, function(err, salt) {
            if (err) return next(err);
            bcrypt2.hash(req.body.password, salt, function(err, hash) {
                if (err) return next(err);
                req.body.password = hash; 
                //console.log(req.body.password);
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

}


})

app.get('/passchange', (req, res)=>{
    res.render('PassChange_window.hbs')
});

app.get('/deleteaccount', (req, res)=>{
    res.render('accountdelete.hbs')
})

app.get('/provider_list', adminSessionCheck, (req, res, list) => {
    //get list of providers from the db
    db.getUsers('user')
    .then((resolved) =>{
        res.render('provider_list.hbs', {
            userData: resolved
        })
    }).catch((error) => {
        console.log(error);
        res.send('error, please try again.')
    });
});

app.post('/provider_list', (req, res) => {
    console.log('prolist');
    db.getUsers('users')
    .then((resolved) => {
        var id = req.body.Idsearch
        var fname = req.body.fnamesearch
        var lname = req.body.lnamesearch
        var status = req.body.querytype
        var list = resolved;

        var filteredList = {providers: filterList(list, id, fname, lname, status)}
        console.log(filteredList);
        res.render('provider_list.hbs', {
            userData: filteredList.providers
        })
    }).catch((error) => {
        console.log(error);
        res.send('error')
    })
});

app.get('/admin_list', superSessionCheck, (req, res) => {
    db.getUsers('admin')
    .then((resolved) => {
        res.render('admin_list.hbs', {
            admins: resolved
        })
    }).catch((error) => {
        console.log(error);
        res.send('error');
    })
})

app.post('/filter_admin_list', (req, res) => {
    var id = req.body.Idsearch
    var fname = req.body.fnamesearch
    var lname = req.body.lnamesearch

    db.getUsers('admin')
    .then((resolved) => {
        var list = resolved;

        var filteredList = {admins: filterList(list, id, fname, lname)}
        res.render('admin_list.hbs', {
            admins: filteredList.admins
        })
    }).catch((error) => {
        console.log(error);
        res.send('error');
    })
});

app.post('/create_admin', (req, res) => {
    console.log(req.body);
    var fname = req.body.fname
    var lname = req.body.lname
    var password = req.body.password
    var email = req.body.email
    //error check again
    db.addAdmin(fname, lname, password, email)
    .then((resolved) => {
        res.send(resolved)
    }).catch((error) => {
        res.sendStatus(500)
    });
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
