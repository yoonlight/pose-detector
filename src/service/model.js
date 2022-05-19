import * as tf from "@tensorflow/tfjs";

class HAR {
	/** @type tf.LayersModel */
	model;
	seq = [];
	result = 0;
	/**
	 *
	 * @param {string} pose
	 */
	async loadModel(pose) {
		const modelUrl = `https://raw.githubusercontent.com/kw-kwix/HAR_model/main/models/${pose}/model.json`;
		this.model = await tf.loadLayersModel(modelUrl);
		this.seq.splice(0, this.seq.length);
	}

	/**
	 *
	 * @param {tf.Tensor} input
	 * @returns {Promise<number[]>}
	 */
	async predict(input) {
		return await this.model.predict(input).squeeze().array();
	}
}

export const har = new HAR();
