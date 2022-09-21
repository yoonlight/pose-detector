import * as tf from "@tensorflow/tfjs";

class HAR {
	/** @type tf.LayersModel */
	model;
	seq = [];
	result = 0;
	state = false;
	count = 0;
	pose = ""

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
	pose_count = {
		babel_curl: function (angle) {
			// console.log(angle[0], angle[5]);
			if (this.state === false) {
				if (angle[0] > 150 && angle[5] > 150) {
					this.state = true;
				}
			} else if (this.state === true) {
				if (angle[0] < 120 && angle[5] < 120) {
					this.count += 1;
					this.state = false;
				}
			}
		},
		deadlift: function (angle) {
			if (this.state === false) {
				if (angle[3] > 150) {
					this.state = true;
				}
			} else if (this.state === true) {
				if (angle[3] < 120) {
					this.count += 1;
					this.state = false;
				}
			}
		},
		knee_up: function (angle) {
			if (this.state === false) {
				// TODO && angle[9] 어떻게 처리할지?
				if (angle[3] < 60) {
					this.state = true;
				}
			} else if (this.state === true) {
				if (angle[3] > 90) {
					this.count += 1;
					this.state = false;
				}
			}
		},
		leg_raise: function (angle) {
			if (this.state === false) {
				if (angle[2] > 150) {
					this.state = true;
				}
			} else if (this.state === true) {
				if (angle[2] < 120) {
					this.count += 1;
					this.state = false;
				}
			}
		},
		over_head_press: function (angle) {
			if (this.state === false) {
				if (angle[0] < 120) {
					this.state = true;
				}
			} else if (this.state === true) {
				if (angle[3] > 150) {
					this.count += 1;
					this.state = false;
				}
			}
		},
		side_crunch: function (angle) {
			if (this.state === false) {
				if (angle[3] < 60) {
					this.state = true;
				}
			} else if (this.state === true) {
				if (angle[3] > 90) {
					this.count += 1;
					this.state = false;
				}
			}
		},
		side_lunge: function (angle) {
			if (this.state === false) {
				if (angle[3] > 150) {
					this.state = true;
				}
			} else if (this.state === true) {
				if (angle[3] < 120) {
					this.count += 1;
					this.state = false;
				}
			}
		},
		side_raise: function (angle) {
			if (this.state === false) {
				if (angle[3] < 60) {
					this.state = true;
				}
			} else if (this.state === true) {
				if (angle[3] > 90) {
					this.count += 1;
					this.state = false;
				}
			}
		},
		squat: function (angle) {
			if (this.state === false) {
				if (angle[3] > 150) {
					this.state = true;
				}
			} else if (this.state === true) {
				if (angle[3] < 120) {
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
