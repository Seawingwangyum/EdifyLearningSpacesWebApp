const port = process.env.port || 8080;
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const session = require('client-sessions');


const app = express();

app.set('view engine', 'hbs')
hbs.registerPartials(__dirname + '/views/partials')
app.use(express.static(__dirname + '/css'))
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/Assets'));

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

app.get('/provider', (req, res) => {
	res.render('provider_page.hbs', {
		userData: testData.provider_page_data
	})
});

app.get('/provider_login', (req, res) => {
	res.render('login.hbs')
});


app.get('/tandp', (req, res) => {
    res.render('terms.hbs')
});

app.get('/test', (req, res) => {
    res.render('testingnavbar.hbs')
});

app.get('/licenses', (req, res) => {
	res.render('dashboard.hbs')
});

app.get('/account_creation', (req, res) => {
	res.render('account_creation.hbs')
});

app.get('/passchange', (req, res)=>{
    res.render('PassChange_window.hbs')
});

app.get('/deleteaccount', (req, res)=>{
    res.render('accountdelete.hbs')
})

app.get('/ad_page', (req, res) => {
	res.render('ad_page.hbs')
})

app.get('/provider_list_page', (req, res) => {
	res.render('provider list page.hbs')
})

app.get('/admin_list_page', (req, res) => {
    res.render('admin list page.hbs')
})

app.get('/admin_list_page_edit', (req, res) => {
    res.render('admin list page edit.hbs')
})


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