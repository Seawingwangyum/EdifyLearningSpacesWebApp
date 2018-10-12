const port = process.env.port || 8080;
const express = require('express');
const hbs = require('hbs');

const app = express();

app.set('view engine', 'hbs')
hbs.registerPartials(__dirname + '/views/partials')
app.use(express.static(__dirname + '/css'))
const fs = require('fs');


app.use(express.static(__dirname + '/public'));



app.get('/provider', (req, res) => {
	res.render('provider page.hbs')
})

app.get('/provider_login', (req, res) => {
	res.render('login.hbs')
})

app.get('/', (req, res) => {
	res.render('dashboard.hbs')
})

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