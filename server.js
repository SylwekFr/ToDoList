var express = require('express');

var app = express();

app.get('/', function(req, res) {
    res.render('todolist.ejs');
})
.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('404 not found');
});
app.listen(8080);