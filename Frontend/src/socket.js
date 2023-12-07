import { io } from "socket.io-client";

export const socket = io(
    process.env.REACT_APP_SOCKET_URL,
    {
        autoConnect: false,
        reconnectionDelay: 10000, // defaults to 1000
        reconnectionDelayMax: 10000 // defaults to 5000
    }

);
