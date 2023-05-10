export default class Exception extends Error {
	constructor(message, code) {
		super(message);
		this.code = code;
	}
}
