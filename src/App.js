import React from "react";
import Mediapipe from "./Mediapipe";
import { socket } from "./service/websocket";

function App() {
	React.useEffect(() => {
		socket.on("connect", () => {
			if (socket.connected) {
				console.log(`id(${socket.id}) success to connect`);
			}
		});

		socket.on("disconnect", () => {
			if (socket.disconnected) {
				console.log("socket server disconnected");
			}
		});

		socket.on("error", (error) => {
			console.error(error);
		});

		socket.on("result", (arg) => {
			console.log(arg);
		});
	});
	return (
		<div className="App">
			<Mediapipe></Mediapipe>
		</div>
	);
}

export default App;
