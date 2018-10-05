const port = process.env.port || 8080;
const express = require('express');
const hbs = require('hbs')

const app = express();

app.set('view engine', 'hbs')
hbs.registerPartials(__dirname + '/views/partials')
app.use(express.static(__dirname + '/css'))



app.get('/', (req, res) => {
	res.render('provider page.hbs')
})

app.listen(process.env.PORT || 8080, () => {
    console.log(`server up on port ${port}`)
});