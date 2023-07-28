// Modules.
const WebSocket = require('ws');
const uuid = require('uuid');

// Helpers
const wsServer = new WebSocket.Server({ noServer: true });
const uuidv4 = uuid.v4;

// Socket connection
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

    // If room exists and is full broadcast it
    socket.on('room_full_check', room => {

        if ( io.sockets.adapter.rooms.get(room) ) {

            // Room has space
            if ( getRoomSize(room) < 2 ) socket.emit('room_space');

            // Room is full
            if ( getRoomSize(room) === 2 ) socket.emit('room_full');

        } else {

            // Room is empty
            socket.emit('room_empty');
        }
    });

    socket.on('user_name', name => {

        // Broadcast entered name and relating socket id
        io.sockets.emit('partner_name', name);
    });

    socket.on('set_current_questions', questions => {

        // Broadcast the current questions for use
        io.sockets.emit('current_questions', questions);
    });

    socket.on('set_user_selections', data => {

        // Broadcast users selections
        io.sockets.emit('user_selections', data);
    });

    // Socket disconnection
    socket.on('disconnect', reason => {

        // Broadcast that user has disconnected
        io.sockets.emit('socket_disconnected', reason);

        console.log('socket disconnected: ', reason);
    });
});

const getRoomSize = room => { return wsServer.sockets.adapter.rooms.get(room).size }

export default function() {

    this.nuxt.hook('listen', server => {

        server.on('upgrade', (req, socket, head) => {

            wsServer.handleUpgrade(req, socket, head, s => wsServer.emit('connection', s) );
        });
    });
};