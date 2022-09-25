import * as tf from "@tensorflow/tfjs";

const between = (value, min, max) => {
	return value >= min && value <= max;
};

class HAR {
	/** @type tf.LayersModel */
	model;
	seq = [];
	result = 0;
	state = false;
	count = 0;
	pose = ""
	leftAngle = 0;
	rightAngle = 0;

	/**
	 *
	 * angle 정보를 가지고 운동 횟수를 카운트
	 *
	 * 팔꿈치: 0, 5
	 *
	 * 골반: 2, 8
	 *
	 * 어깨: 1, 7
	 *
	 * 무릎: 3, 9
	 *
	 * Reference
	 *
	 * - https://norux.me/61
	 *
	 * @param {[]} angle
	 * @returns {void}
	 */
	pose_count = {
		babel_curl: (angle) => {
			this.leftAngle = angle[0];
			this.rightAngle = angle[5];

			if (this.state === false) {
				if (between(this.leftAngle, 30, 35)) {
					this.state = true;
				}
			} else if (this.state === true) {
				if (between(this.leftAngle, 50, 55)) {
					this.count += 1;
					this.state = false;
				}
			}
		},
		deadlift: (angle) => {
			this.leftAngle = angle[3];
			this.rightAngle = angle[9];
			if (this.state === false) {
				if (between(this.leftAngle, 100, 105)) {
					this.state = true;
				}
			} else if (this.state === true) {
				if (between(this.leftAngle, 50, 55)) {
					this.count += 1;
					this.state = false;
				}
			}
		},
		knee_up: (angle) => {
			this.leftAngle = angle[3];
			this.rightAngle = angle[9];
			if (this.state === false) {
				// TODO && angle[9] 어떻게 처리할지?
				if (
					between(this.leftAngle, 45, 50) &&
					between(this.rightAngle, 95, 100)
				) {
					this.state = true;
				}
			} else if (this.state === true) {
				if (
					between(this.leftAngle, 120, 125) ||
					between(this.rightAngle, 70, 75)
				) {
					this.count += 1;
					this.state = false;
				}
			}
		},
		leg_raise: (angle) => {
			this.leftAngle = angle[2];
			this.rightAngle = angle[8];
			if (this.state === false) {
				if (
					between(this.leftAngle, 5, 12) &&
					between(this.rightAngle, 10, 17)
				) {
					this.state = true;
				}
			} else if (this.state === true) {
				if (
					between(this.leftAngle, 75, 85) &&
					between(this.rightAngle, 5, 10)
				) {
					this.count += 1;
					this.state = false;
				}
			}
		},
		over_head_press: (angle) => {
			this.leftAngle = angle[0];
			this.rightAngle = angle[5];
			if (this.state === false) {
				if (
					between(this.leftAngle, 60, 70) &&
					between(this.rightAngle, 65, 75)
				) {
					this.state = true;
				}
			} else if (this.state === true) {
				if (
					between(this.leftAngle, 5, 10) &&
					between(this.rightAngle, 10, 15)
				) {
					this.count += 1;
					this.state = false;
				}
			}
		},
		side_crunch: (angle) => {
			this.leftAngle = angle[3];
			this.rightAngle = angle[9];
			if (this.state === false) {
				if (
					between(this.leftAngle, 40, 45) &&
					between(this.rightAngle, 100, 105)
				) {
					this.state = true;
				}
			} else if (this.state === true) {
				if (
					(between(this.leftAngle, 150, 155) &&
						between(this.rightAngle, 105, 110)) ||
					(between(this.leftAngle, 40, 45) &&
						between(this.rightAngle, 105, 110))
				) {
					this.count += 1;
					this.state = false;
				}
			}
		},
		side_lunge: (angle) => {
			this.leftAngle = angle[3];
			this.rightAngle = angle[9];
			if (this.state === false) {
				if (
					between(this.leftAngle, 65, 75) &&
					between(this.rightAngle, 100, 110)
				) {
					this.state = true;
				}
			} else if (this.state === true) {
				if (
					(between(this.leftAngle, 110, 115) &&
						between(this.rightAngle, 115, 120)) ||
					(between(this.leftAngle, 45, 55) &&
						between(this.rightAngle, 75, 80))
				) {
					this.count += 1;
					this.state = false;
				}
			}
		},
		side_raise: (angle) => {
			this.leftAngle = angle[0];
			this.rightAngle = angle[5];
			if (this.state === false) {
				if (
					between(this.leftAngle, 75, 80) &&
					between(this.rightAngle, 80, 85)
				) {
					this.state = true;
				}
			} else if (this.state === true) {
				if (
					between(this.leftAngle, 50, 55) &&
					between(this.rightAngle, 50, 55)
				) {
					this.count += 1;
					this.state = false;
				}
			}
		},
		squat: (angle) => {
			this.leftAngle = angle[3];
			this.rightAngle = angle[9];
			if (this.state === false) {
				if (
					between(this.leftAngle, 45, 50) &&
					between(this.rightAngle, 95, 100)
				) {
					this.state = true;
				}
			} else if (this.state === true) {
				if (
					between(this.leftAngle, 115, 120) &&
					between(this.rightAngle, 110, 115)
				) {
					this.count += 1;
					this.state = false;
				}
			}
		},
	}

	/**
	 *
	 * @param {string} pose
	 */
	async loadModel(pose) {
		const modelUrl = `https://raw.githubusercontent.com/kw-kwix/HAR_model/main/model_js/CNN_${pose}_model_tfjs/model.json`;
		this.model = await tf.loadLayersModel(modelUrl);
		console.log('load model');
		this.seq.splice(0, this.seq.length);
		this.pose = pose;
		this.count = 0;
	}

	/**
	 *
	 * @param {tf.Tensor} input
	 * @returns {Promise<number[]>}
	 */
	async predict(input) {
		return await this.model.predict(input).squeeze().array();
	}
	/**
	 *
	 * angle 정보를 가지고 운동 횟수를 카운트
	 *
	 * 팔꿈치: 0, 5
	 *
	 * 골반: 2, 8
	 *
	 * 어깨: 1, 7
	 *
	 * 무릎: 3, 9
	 *
	 * @param {[]} angle
	 * @returns {void}
	 */
	countExercise(angle) {
		if (this.pose !== "") {
			this.pose_count[this.pose](angle)
			// console.log(this.state);
		}
	}
}

export const har = new HAR();
