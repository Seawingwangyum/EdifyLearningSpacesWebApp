const port = process.env.port || 8080;
const express = require('express');

const app = express();

const fs = require('fs');
const hbs = require('hbs');

app.use(express.static(__dirname + '/public'));



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