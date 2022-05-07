import { io } from "socket.io-client";

const host = "ws://localhost:5000";

export const socket = io(host);
