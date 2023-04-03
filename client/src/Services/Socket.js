import io from "socket.io-client";
// const SOCKET_URL = "http://localhost:3601";
const SOCKET_URL = "http://chat-app-raghav-03.vercel.app";

// export const socket = io(SOCKET_URL);
// export const socket = io.connect();
export const socket = io(SOCKET_URL, { transports: ["websocket", "polling"] });
