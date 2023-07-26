// Modules.
const WebSocket = require('ws');
const uuid = require('uuid');

// Helpers
const wsServer = new WebSocket.Server({ noServer: true });
const uuidv4 = uuid.v4;

wsServer.on('connection', async socket => {

    const socketId = uuidv4();
    console.log('socket: ', socketId, ' has connected.');

    // Join room by id
    socket.on('room_join', room => {

        socket.join(room);
        console.log('socket: ', socketId, ' has joined the room.');

        // Broadcast number of room occupants
        io.sockets.emit('room_occupants', getRoomSize(room));

        // Tell socket if its the host
        socket.emit('room_host', getRoomSize(room) === 1);
    });
});

export default function() {

    this.nuxt.hook('listen', server => {

        server.on('upgrade', (req, socket, head) => {

            wsServer.handleUpgrade(req, socket, head, s => wsServer.emit('connection', s) );
        });
    });
};