import io from "socket.io-client";
// const SOCKET_URL = "http://localhost:3601";
const SOCKET_URL = "https://websockets-server-raghav.glitch.me/";

export const socket = io(SOCKET_URL, {
  headers: {
    "user-agent": "Mozilla",
  },
});
// export const socket = io.connect();
