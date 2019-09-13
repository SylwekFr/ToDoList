var express = require('express');
var session = require('cookie-session');
var bodyParser = require('body-parser');
var encodedUrl = bodyParser.urlencoded({ extended: false });

var app = express();
app.use(session({secret: 'todolistinsession'}))

.use(function(req, res, next){
    if (typeof(req.session.todolist) == 'undefined') {
        req.session.todolist = [];
    }
    next();
})
.get('/', function(req, res) {
    res.render('todolist.ejs', {todolist: req.session.todolist});
})
.post('/ajouter/', encodedUrl, function(req, res) {
    if (req.body.addtodo !=''){
        req.session.todolist.push(req.body.newtodo);
    }
    res.redirect('/');
})
.get('/supprimer/:index', function(req, res) {
    if (req.param.index != '') {
        req.session.todolist.splice(req.params.index, 1);
    }
    res.redirect('/');
})
.use(function(req, res, next){
    res.redirect('/')
});
app.listen(8080);