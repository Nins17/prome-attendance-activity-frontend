import { io } from "socket.io-client";

// FOR LOCALHOST
// export const socket = io("http://localhost:3000", {
//     transports: ["websocket"],
// })

export const socket = io(process.env.NEXT_PUBLIC_API_URL, {
    transports: ["websocket"],
})