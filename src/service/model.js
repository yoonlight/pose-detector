import * as tf from "@tensorflow/tfjs";

class HAR {
	/** @type tf.LayersModel */
	model;
	seq = [];
	result = 0;
	state = false;
	count = 0;
	/**
	 *
	 * @param {string} pose
	 */
	async loadModel(pose) {
		const modelUrl = `https://raw.githubusercontent.com/kw-kwix/HAR_model/main/model_js/${pose}/model.json`;
		this.model = await tf.loadLayersModel(modelUrl);
		this.seq.splice(0, this.seq.length);
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
		if (this.state === false && angle[3] < 60) {
			this.state = true;
		} else if (this.state === true && angle[3] > 90) {
			this.count += 1;
			this.state = false;
		}
	}
}

export const har = new HAR();
