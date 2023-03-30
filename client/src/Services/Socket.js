import io from "socket.io-client";
const SOCKET_URL = "https://chat-app-raghav-03.vercel.app/";

export const socket = io(SOCKET_URL);
