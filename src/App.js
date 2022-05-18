import React from "react";
import Mediapipe from "./Mediapipe";
import { har } from "./service/model";

function App() {
	const [pose, setPose] = React.useState(undefined);
	React.useEffect(() => {
		if (pose) {
			har.loadModel(pose);
			console.log("load model");
		}
	});
	return (
		<div className="App">
			<button onClick={() => setPose("crunch")}>crunch</button>
			<button onClick={() => setPose("lying_leg_raise")}>
				lying_leg_raise
			</button>
			<button onClick={() => setPose("side_lunge")}>side_lunge</button>
			<button onClick={() => setPose("standing_knee_up")}>
				standing_knee_up
			</button>
			<button onClick={() => setPose("standing_side_crunch")}>
				standing_side_crunch
			</button>
			<Mediapipe></Mediapipe>
		</div>
	);
}

export default App;
