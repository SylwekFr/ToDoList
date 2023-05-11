const ent = require('ent');

module.exports = function (shared, iosession) {
  const pseudoarray = [];
  const taskarray = [];

  return function (socket) {
    socket.emit('connected', { unames: pseudoarray, tasks: taskarray });

    socket.on('user', function (pseudo) {
      pseudo = ent.encode(pseudo);
      pseudoarray.push(pseudo);
      socket.handshake.session.pseudo = pseudo;
      socket.handshake.session.save();
      socket.broadcast.emit('user', socket.handshake.session.pseudo);
    });

    socket.on('task', function (task) {
      task = ent.encode(task);
      taskarray.push(task);
      socket.broadcast.emit('task', { task: task });
    });

    socket.on('delete', function(index){
        taskarray.splice(index,1);
        socket.broadcast.emit('delete', {index : index});
    });

    socket.on('disconnect', function(){
        let user=socket.handshake.session.pseudo;
        let index;
        for( let i = 0; i < pseudoarray.length; i++){
            if ( pseudoarray[i] == user) {
                pseudoarray.splice(i,1);
                index=i;
            }
        }
        socket.broadcast.emit("diconnected", {index:index});
    });
    }
}