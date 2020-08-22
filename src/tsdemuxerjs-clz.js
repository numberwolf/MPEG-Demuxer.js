var ModuleTS = require('./demuxer/missilets.js');
var def = require('./consts');

class TsDemuxerJsClazz {
	constructor(videoURL, config) {
        this.videoURL = videoURL;
        this.configFormat = {
        };

        // member
        this.mediaAttr = {
        	sampleRate : 0,
        	sampleChannel : 0,
        	vWidth : 0,
        	vHeight : 0,
        	vFps : 0,
        	vGop : 0
        }
	}

	// outside
	do(callback) {
		let _this = this;
        if (!window.WebAssembly) {
            let tip = 'unsupport WASM!';
            if (/iPhone|iPad/.test(window.navigator.userAgent)) {
                tip += ' ios:min-version 11'
            }
            alert(tip);
            alert("Please check your browers, it not support wasm! See:https://www.caniuse.com/#search=wasm");
        } else {
			console.log("to onRuntimeInitialized");
	        ModuleTS.onRuntimeInitialized = () => {
	            console.log('WASM initialized');

	            ModuleTS.cwrap('initTsMissile', 'number', [])();
	            console.log('Initialized initTsMissile');

	            ModuleTS.cwrap('initializeDemuxer', 'number', ['number'])(0); // 0 hevc
	            console.log('Initialized initializeDemuxer');
	            
	            _this.demuxerTsInit(callback);
	        };
	    }
	}

	// inside
	demuxerTsInit(callback) {
		let _this = this;
		fetch(this.videoURL)
		.then(res => res.arrayBuffer())
		.then(streamBuffer => {
			streamBuffer.fileStart = 0;

			// array buffer to unit8array
			let streamUint8Buf = new Uint8Array(streamBuffer);

			console.log(streamUint8Buf);
			console.log(streamUint8Buf.length);
			let offset = ModuleTS._malloc(streamUint8Buf.length)
            ModuleTS.HEAP8.set(streamUint8Buf, offset)

            let decRet = ModuleTS.cwrap('demuxBox', 'number', ['number', 'number'])(offset, streamUint8Buf.length)
            console.log('Run demuxBox : ' + decRet);

            if (decRet >= 0) {
            	_this.setMediaInfo();
            	callback();
            }
		});
	}

	// inside
	setMediaInfo() {
		let ptr = ModuleTS.cwrap('getMediaInfo', 'number', [])();
		let a_sample_rate = ModuleTS.HEAPU32[ptr / 4];
        let a_channel = ModuleTS.HEAPU32[ptr / 4 + 1];

        let fps = ModuleTS.HEAPF64[ptr / 8 + 1];
        let gop = ModuleTS.HEAPU32[ptr / 4 + 2 + 2];
        let width = ModuleTS.HEAPU32[ptr / 4 + 2 + 2 + 1];
        let height = ModuleTS.HEAPU32[ptr / 4 + 2 + 2 + 1 + 1];

		this.mediaAttr.sampleRate = a_sample_rate > 0 ? 
			a_sample_rate : def.DEFAULT_SAMPLERATE;
        this.mediaAttr.sampleChannel = a_channel > 0 ? 
        	a_channel : def.DEFAULT_CHANNEL;

        this.mediaAttr.vFps = fps;
        this.mediaAttr.vGop = gop;
        this.mediaAttr.vWidth = width;
        this.mediaAttr.vHeight = height;

        // console.log(this.mediaAttr);
	}

	// outside
	readMediaInfo() {
		return this.mediaAttr;
	}

	// outside
	readPacket() {
		let ptr = ModuleTS.cwrap('getPacket', 'number', [])(); // 1bytes 

		let type = ModuleTS.HEAPU32[ptr / 4]; // 0 video 1 audio
        let size = ModuleTS.HEAPU32[ptr / 4 + 1]; // 4 bytes 32 bits
        let ptime = ModuleTS.HEAPF64[ptr / 8 + 1]; // 8 bytes
        let dtime = ModuleTS.HEAPF64[ptr / 8 + 1 + 1];

        let dataPtr = ModuleTS.HEAPU32[ptr / 4 + 1 + 1 + 2 + 2]; // 4bytes ptr
        let dataPacket = ModuleTS.HEAPU8.subarray(dataPtr, dataPtr + size);

        let returnValue = {
        	type : type,
        	size : size,
        	ptime : ptime,
        	dtime : dtime,
        	data : dataPacket
        }

        // console.log("readPacket"
        // 	+ ", type:" + type 
        // 	+ ", size:" + size 
        // 	+ ", ptime:" + ptime
        // 	+ ", dtime:" + dtime);
        // console.log(dataPacket);
        return returnValue;
	}

	// outside
	releaseDemuxer() {
		ModuleTS.cwrap('exitTsMissile', 'number', [])();
	}
}

exports.TsDemuxerJsMod = TsDemuxerJsClazz;





