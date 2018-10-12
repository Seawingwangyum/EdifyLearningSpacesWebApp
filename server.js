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

// creates a session
app.use(session({
    cookieName: 'edify_session',
    secret: 'edify_apple_sauce',
    duration: 1 * 60 * 60 * 1000,
    activeDuration: 1 * 30 * 60 * 1000
}));

// Checks to see if the session is still active, if it isnt it redirects to '/provider_login'
function sessionCheck(req, res, next) {
    if (req.session && req.session.user) {
        next()
    } else {
        res.redirect('/provider_login')
    }
}

app.get('/provider', (req, res) => {
	res.render('provider page.hbs')
});

app.get('/provider_login', (req, res) => {
	res.render('login.hbs')
});

app.get('/dashboard', (req, res) => {
	res.render('dashboard.hbs')
});

app.listen(process.env.PORT || 8080, () => {
    console.log(`server up on port ${port}`)
});



app.get('/status', (request, response) => {
    /**
     * Displays the status page
     */

    response.render('status.hbs', {
        title: 'Status Page'

    });
});


app.get('/licenses', (request, response) => {
    /**
     * Displays the status page
     */

    response.render('licenses.hbs', {
        title: 'Status Page'

    });
});


app.get('/settings', (request, response) => {
    /**
     * Displays the status page
     */

    response.render('settings.hbs', {
        title: 'Status Page'

    });
});