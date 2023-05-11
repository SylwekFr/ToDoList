const express = require('express');
const app = express();
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const io = require('socket.io')(server);

// Other required dependencies
const session = require('cookie-session');
const iosession = require('express-session')({
  secret: 'pseudo',
  resave: true,
  saveUninitialized: true
});
const sharedsession = require("express-socket.io-session");


app.use(session({ secret: 'todolistinsession' }))
  .use(iosession)
  .use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'))
  .use('/js', express.static(__dirname + '/node_modules/jquery/dist'))
  .use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'))
  .use(bodyParser.urlencoded({ extended: false }));


const routes = require('./routes')(io, iosession);
app.use('/', routes);


const shared = io.of('/shared/');
const sharedSocket = require('./sharedSocket')(shared, iosession);
shared.use(sharedsession(iosession));
shared.on('connection', sharedSocket);


server.listen(8080, () => {
  console.info('Server started on port 8080');
});