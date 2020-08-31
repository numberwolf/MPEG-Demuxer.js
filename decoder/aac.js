class AACDecoderClazz {
	constructor(config) {
		this.sampleRate = config.sampleRate;
		this.frameDurMs = Math.floor(1024.0 * 1000.0 / this.sampleRate);
		this.frameDurSec = this.frameDurMs / 1000.0;
	}

	updateConfig(config) {
		this.sampleRate = config.sampleRate;
		this.frameDurMs = 1024.0 * 1000.0 / this.sampleRate;
		this.frameDurSec = this.frameDurMs / 1000.0;
	}

	// uint8
	sliceAACFrames(startTime, dataPacket) { // static
		let _this = this;
		/*
		 * [
		 *		{"ptime" : 0.001, "data" : xxx},
		 *		...
		 * ]
		 */
		let dataInfo = [];
        // console.log("dataPacket:", dataPacket);
        let startIdx = -1;
        let startIdxTime = startTime;
        for (let i = 0; i < dataPacket.length - 1; i++) {
            // last frame check
            if (i == dataPacket.length - 2) { // [... , fin - 1 , fin]
                // console.log("Get Frame");
                startIdx = startIdx < 0 ? 0 : startIdx;

                let len = (dataPacket.length - 1) - startIdx; // between startIdx, lastIdx
                let tempBuf = dataPacket.subarray(startIdx, i+1);
                let buf = new Uint8Array(len);
                buf.set(tempBuf, 0);
                startIdx = i;
                dataInfo.push({
                	ptime : startIdxTime,
                	data : buf
                });
                break;
            }

            // get aac frame split slice by 0xFFF, but we use 0xFF 0xF1
            // @TODO 0xFFF , val >> 4 == 0x0F
            // if (dataPacket[i] == 0xFF && dataPacket[i+1] == 0xF1) {
            if (dataPacket[i] == 0xFF && (dataPacket[i+1] >> 4) == 0x0F) {
                if (startIdx < 0) {
                    startIdx = i;
                } else {
                    // console.log("Get Frame", dataPacket[i+1] >> 8);
                    let len = i - startIdx;
                    let tempBuf = dataPacket.subarray(startIdx, i-1);
                    // console.log("-->d", dataPacket);
                    let buf = new Uint8Array(len);
                    buf.set(tempBuf, 0);
                    startIdx = i;
                    dataInfo.push({
                    	ptime : startIdxTime,
                    	data : buf
                    });
                    
                    // console.log(_this.sampleRate, _this.frameDurMs, _this.frameDurSec);
                    startIdxTime += _this.frameDurSec;
                }
            } // end if 0xFF
        } // end for

        return dataInfo;
	}
}

exports.AACDecoder = AACDecoderClazz;