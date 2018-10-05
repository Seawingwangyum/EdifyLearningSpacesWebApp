const port = process.env.port || 8080;
const express = require('express');
const hbs = require('hbs')

const app = express();

app.set('view engine', 'hbs')
hbs.registerPartials(__dirname + '/views/partials')
app.use(express.static(__dirname + '/css'))



app.get('/provider', (req, res) => {
	res.render('provider page.hbs')
})

app.get('/provider_login', (req, res) => {
	res.render('login.hbs')
})

app.get('/dashboard', (req, res) => {
	res.render('dashboard.hbs')
})

app.listen(process.env.PORT || 8080, () => {
    console.log(`server up on port ${port}`)
});