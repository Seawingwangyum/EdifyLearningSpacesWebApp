const port = process.env.port || 8080;
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const session = require('client-sessions');

const app = express();

const password_check = require("./components/password_check");


app.set('view engine', 'hbs')
hbs.registerPartials(__dirname + '/views/partials')
app.use(express.static(__dirname + '/css'))
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/fonts'));

// bodyparser setup
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded ({
    extended: true
}));
app.use(bodyParser.json())

// creates a session
app.use(session({
    cookieName: 'edify_session',
    secret: 'edify_apple_sauce',
    duration: 1 * 60 * 60 * 1000,
    activeDuration: 1 * 30 * 60 * 1000
}));

var testData = require('./public/testData')

// Checks to see if the session is still active, if it isnt it redirects to '/provider_login'
function sessionCheck(req, res, next) {
    if (req.session && req.session.user) {
        next()
    } else {
        res.redirect('/provider_login')
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
            console.log(4, filteredList);
        }
    }
    console.log(filteredList);
    return filteredList
}

app.get('/provider_edit', (req, res) => {
	res.render('provider_edit.hbs', {
		userData: testData.provider_edit_data
	})
});

app.get('/landing_page', (req, res) => {
	res.render('landing_page.hbs')
});

app.get('/requirements', (req, res) => {
	res.render('requirements.hbs')
});

/*
app.get('/ad_page', (req, res) => {
	res.render('ad_page.hbs')
});
app.get('/provider_login', (req, res) => {
	res.render('login.hbs')
});
*/

app.get('/tandp', (req, res) => {
    res.render('terms.hbs')
});

app.get('/verifyemail', (req, res) => {
    res.render('verifyemail.hbs')
});

app.get('/test', (req, res) => {
    res.render('testingnavbar.hbs')
});

app.get('/licenses', (req, res) => {
	res.render('dashboard.hbs')
});

app.post('/licenses', (req, res) => {
    res.render('dashboard.hbs')
});

app.get('/account_creation', (req, res) => {
	res.render('account_creation.hbs')
});

app.post('/account_creation', (req, res) =>{
    console.log(req.body);
    password_check.check_password(req.body).then((info) =>{
        console.log(info)
        res.send(JSON.stringify(info))
    }, (error) =>{
        console.log(error)
        res.send(JSON.stringify(error))
    })
    
});

app.get('/passchange', (req, res)=>{
    res.render('verifyemail.hbs')
});

app.get('/deleteaccount', (req, res)=>{
    res.render('accountdelete.hbs')
})

app.get('/provider_list', (req, res, list) => {
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

app.get('/admin_list', (req, res) => {
    res.render('admin_list.hbs', {
        userData: testData.admin_list_data
    })

});

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

app.get('/admin_edit', (req, res) => {
    res.render('admin_edit.hbs')
});


app.get('/quiz', (request, response) => {
    /**
     * Displays the status page
     */

    response.render('quiz.hbs');
});

app.get('/quizresults', (request, response) => {
    /**
     * Displays the status page
     */

    response.render('quizresults.hbs', {
        title: 'Quiz Page'
    });
});


app.get('/status', (request, response) => {
    /**
     * Displays the status page
     */

    response.render('status.hbs', {
        title: 'Status Page'
    });
});

app.get('/settings', (request, response) => {
    /**
     * Displays the status page
     */

    response.render('settings.hbs', {
        title: 'Settings Page'
    });
});

app.listen(process.env.PORT || 8080, () => {
    console.log(`server up on port ${port}`)
});