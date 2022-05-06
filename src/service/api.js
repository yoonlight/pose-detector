import axios from "axios";

axios.defaults.withCredentials = true;

/**
 *
 * @param {number[][]} m
 * @returns
 */
export const predict = (m) =>
	axios.post("/classify", { input: m });
