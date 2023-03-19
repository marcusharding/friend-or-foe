// Modules
const { Server } = require('socket.io');
const io = new Server();
import { defineNuxtModule } from '@nuxt/kit';

// Socket connection
io.on('connection', async socket => {

    const socketId = socket.client.id;
    console.log('socket: ', socketId, ' has connected.');

    // Join room by id
    socket.on('room_join', room => {
    
        socket.join(room);
        console.log('socket: ', socketId, ' has joined the room.')

        // Broadcast number of room occupants
        io.sockets.emit('room_occupants', getRoomSize(room));

        // Tell socket if its the host
        socket.emit('room_host', getRoomSize(room) === 1);
    });

    // If room exists and is full broadcast it
    socket.on('room_full_check', room => {

        if ( io.sockets.adapter.rooms.get(room) ) {

            // Room has space
            if ( getRoomSize(room) < 2 ) {
                socket.emit('room_space');
            }

            // Room is full
            if ( getRoomSize(room) === 2 ) {
                socket.emit('room_full');
            }

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

    // Socket disconnection
    socket.on('disconnect', reason => {

        console.log('socket disconnected: ', reason);

        // Broadcast that user has disconnected
        io.sockets.emit('socket_disconnected', reason);
    });
});

const getRoomSize = room => {
    return io.sockets.adapter.rooms.get(room).size;
}

export default defineNuxtModule({
    setup (options, nuxt) {

        nuxt.hook('listen', async server => {
            
            io.attach(server);
        });
    }
});