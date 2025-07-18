//CONNECTION VARIABLES
var express = require('express');
var app = express();
var server = app.listen(3000, '0.0.0.0', () => {
  console.log("Socket server is running on port 3000");
});
var socket = require('socket.io');

//INITIALIZATION
app.use(express.static('public'));

//PRIVATE VARIABLES
var adminSocket = null;
var clientsSockets = {}

//specifying the socket
var io = socket(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });


io.sockets.on('connection', (socket) =>{

  //on receiving role messages
  socket.on('user_role', (data) => {
    
    //ADMIN
    if(data.role === 'admin'){
      if(adminSocket == null){
        adminSocket = socket;
        socket.role = 'admin';
        console.log('Admin connected: ' + socket.id);
      } else {
        console.log('Admin already connected: ' + socket.id);
      }
    
    //CLIENT
    } else if(data.role === 'client'){
      clientsSockets[socket.id] = socket;
      clientsSockets[socket.id].role = 'client';
      console.log('Client connected: ' + socket.id);
      
      //notify admin if exist
      if(adminSocket){
        adminSocket.emit('new_client', {clientId: socket.id, name: data.name});
      }
    }
  });

  socket.on('plus_quota', (data) =>{
    adminSocket.emit('plus_quota', {value: data.value, name: data.name});
  })

  socket.on('disconnect', () => {
    console.log('Socket disconnected: ' + socket.id);

    if (socket.role === 'admin') {
      console.log('Admin has disconnected');
      adminSocket = null;
    } else if (socket.role === 'client') {
      delete clientsSockets[socket.id];
      console.log('Client removed: ' + socket.id);
    }
  });
});