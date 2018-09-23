const port = process.env.port || 8080;
const express = require('express');

const app = express();



app.listen(process.env.PORT || 8080, () => {
    console.log(`server up on port ${port}`)
});