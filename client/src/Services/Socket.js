import io from "socket.io-client";
// import { SOCKET_URL } from "config";
const SOCKET_URL = "http://localhost:3601";

export const socket = io(SOCKET_URL);
