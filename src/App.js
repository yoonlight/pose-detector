import React from "react";
import Mediapipe from "./Mediapipe";
import { har } from "./service/model";

function App() {
	React.useEffect(() => {
		har.loadModel();
	});
	return (
		<div className="App">
			<Mediapipe></Mediapipe>
		</div>
	);
}

export default App;
