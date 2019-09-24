let express = require('express');
let app = express();
let server = require('http').Server(app);
let ent = require('ent');
let session = require('cookie-session');
let iosession = require('express-session')({
    secret: 'pseudo',
    resave: true,
     saveUninitialized: true
    });
let sharedsession = require("express-socket.io-session");
let bodyParser = require('body-parser');
let io = require('socket.io')(server);
let shared = io.of('/shared/');
let encodedUrl = bodyParser.urlencoded({ extended: false });
app.use(session({secret: 'todolistinsession'}))
.use(iosession)
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
.get('/shared/', function (req, res) {
    res.render('shared.ejs');
  })
.use(function(req, res, next){
    res.redirect('/')
});
let pseudoarray=[];
let taskarray=[];
shared.use(sharedsession(iosession))
shared.on('connection', function (socket, pseudo) {
    socket.emit('connected', {unames: pseudoarray, tasks: taskarray});
    socket.on('user', function(pseudo){
        pseudo=ent.encode(pseudo);
        pseudoarray.push(pseudo);
        socket.handshake.session.pseudo = pseudo;
        socket.handshake.session.save();
        socket.broadcast.emit('user', socket.handshake.session.pseudo)
    })
    socket.on('task', function(task){
        task=ent.encode(task);
        taskarray.push(task);
        socket.broadcast.emit('task', {task : task});
    })
    socket.on('delete', function(index){
        taskarray.splice(index);
        socket.broadcast.emit('delete', {index : index});
    })
    socket.on('disconnect', function(){
        let user=socket.handshake.session.pseudo;
        let index;
        for( var i = 0; i < pseudoarray.length; i++){
            if ( pseudoarray[i] == user) {
                pseudoarray.splice(i);
                index=i;
            }
        }
        socket.broadcast.emit("diconnected", {index:index});
    });
});
server.listen(8080);