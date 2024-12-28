import { Server as SocketIOServer } from 'socket.io';

let io;

export const init = (httpServer) => {
    io = new SocketIOServer(httpServer, {
        cors: {
            origin: '*',
        },
    });
    return io;
};

export const getIo = () => {
    if (!io) throw new Error(`Socket.io Cannot be initialized or doesn't exist`);
    return io;
};
