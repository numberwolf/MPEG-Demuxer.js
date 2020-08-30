const def = require('../consts');

class HevcClazz {
	/**
	 * @brief UInt8array
	 */
	constructor(frame) {
		this.frame = frame;
	}

	_removeAud() {
		// def.H265AUD
		if ([
				this.frame[0], this.frame[0], this.frame[0], this.frame[0], 
				this.frame[0], this.frame[0], this.frame[0]
			] == def.H265AUD
		) {

			let frameTemp = new Uint8Array(this.frame.length - 7);
            frameTemp.set(this.frame.subarray(7));
            this.frame = frameTemp;
		}
	}

	_getKeyType() {
		
	}

	handleFrame() {
		this._removeAud();
		return this.frame;
	}
}

exports.Hevc = HevcClazz;