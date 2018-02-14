var quicklee = require('../src/express-quicklee');

var axios = require("axios");
var express = require('express');
var app = express();


var url = 'http://www.mocky.io/v2/5a82df142f00004c0074bbdf';


app.use(quicklee);

app.get('/cache', function (req, res) {

    axios.get(url).then(function (article) {
        res.send(article.data);
    });
});

app.listen(3001);
console.log('Listening on port 3001...');
