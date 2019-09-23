var express = require('express');
var app = express();
let server = require('http').createServer(app);
var session = require('cookie-session');
var bodyParser = require('body-parser');
let io = require('socket.io').listen(server);
var encodedUrl = bodyParser.urlencoded({ extended: false });
app.use(session({secret: 'todolistinsession'}))
.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'))
.use('/js', express.static(__dirname + '/node_modules/jquery/dist'))
.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'))
.use(function(req, res, next){
    if (typeof(req.session.todolist) == 'undefined') {
        req.session.todolist = [];
    }
    next();
})
.get('/', function(req, res) {
    res.render('index.ejs');
})
.get('/private/', function(req, res) {
    res.render('todolist.ejs', {todolist: req.session.todolist});
})
.post('/private/add/', encodedUrl, function(req, res) {
    if (req.body.addtodo !=''){
        req.session.todolist.push(req.body.addtodo);
    }
    res.redirect('/private/');
})
.get('/private/delete/:index', function(req, res) {
    if (req.param.index != '') {
        req.session.todolist.splice(req.params.index, 1);
    }
    res.redirect('/private/');
})
.get('/shared', function (req, res) {
    res.sendFile('view/shared.html' , { root : __dirname});
  })
.use(function(req, res, next){
    res.redirect('/')
});
server.listen(8080);