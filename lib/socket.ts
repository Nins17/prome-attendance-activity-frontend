import { io } from "socket.io-client";

// FOR LOCALHOST
// export const socket = io("http://localhost:3000", {
//     transports: ["websocket"],
// })

export const socket = io(process.env.FRONTEND_URL, {
    transports: ["websocket"],
})