const { expireLobby } = require("../Controllers/lobbyController");

const lobbyAdminMap = {};

exports.LobbySockets = (io) => {

    io.use((socket, next) => {
        socket.data = socket.handshake.auth;
        next();
    });

    io.on("connection", (socket) => {

        console.log(socket.data, socket.time);

        if (socket.recovered) {
            console.log("Recovered Client Connected", socket.id);
            return;
        } else {
            console.log("New Client Connected", socket.id);

            socket.on('player-joined', ({ lobbyCode, userid, username }) => {
                if (!lobbyAdminMap[lobbyCode]) {
                    lobbyAdminMap[lobbyCode] = socket.id;
                }
                socket.join(lobbyCode);
                io.in(lobbyCode).emit('announcement', `${username} has joined the Lobby`);
            });

            socket.on('disconnect', async () => {
                console.log("Client Disconnected", socket.id);
                if (socket.data) {
                    const { lobbyCode, userid, username } = socket.data;
                    // if()
                    io.in(lobbyCode).emit('announcement', `${username} has left the Lobby`);

                    if (lobbyAdminMap[lobbyCode] === socket.id) {
                        io.in(lobbyCode).emit('announcement', `${username} was the admin and has left the Lobby`);
                        socket.in(lobbyCode).emit('end-lobby');

                        try {
                            const data = await expireLobby({ lobbyCode });
                            if (data.status) {
                                delete lobbyAdminMap[lobbyCode];
                                console.log("Lobby Expired", lobbyCode);
                            }
                            else {
                                const err = new Error("Error in Expire Lobby");
                                err.statusCode = 500;
                                throw err;
                            }
                        }
                        catch (error) {
                            console.log(error);
                        }

                    }
                }
            });
        }

        socket.on('start-game', ({ lobbyCode, waitTime, startTime, difficulty, paragraph }) => {
            io.in(lobbyCode).emit('announcement', `Game is starting in ${waitTime} seconds`);
            io.in(lobbyCode).emit('game-ready', { waitTime, startTime, difficulty, paragraph });
        });

        socket.on('end-game', ({ lobbyCode, userid, username }) => {
            io.in(lobbyCode).emit('announcement', `${username} has ended the game`);
            io.in(lobbyCode).emit('end-lobby');
        });

        socket.on('player-progress-info', ({ lobbyCode, userid, username, stats }) => {
            io.in(lobbyCode).emit('player-progress-report', { userid, username, stats });
        });

        socket.on('player-finish-info', ({ lobbyCode, userid, username, stats }) => {
            io.in(lobbyCode).emit('announcement', `${username} has finished the game`);
            io.in(lobbyCode).emit('player-finish-report', { userid, username, stats });
        });

        // socket.on('player-left', ({ lobbyCode, userid, username }) => {
        //     io.in(lobbyCode).emit('announcement', `${username} has left the Lobby`);
        // });


    });
};