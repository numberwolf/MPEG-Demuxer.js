module.exports = {
    DEFAULT_SAMPLERATE: 44100,
    DEFAULT_CHANNEL: 1,
    H264AUD : [0, 0, 0, 1, 0x09, 0xE0],
    H265AUD : [0, 0, 0, 1, 0x46, 0x01, 0x50],  // new Uint8Array(
    DEF_AAC : "aac",
    DEF_MP3 : "mp3",
    DEF_H265 : "h265",
    DEF_HEVC : "hevc",
    DEF_H264 : "h264",
    DEF_AVC : "avc",
    CODEC_OFFSET_TABLE : [	
	    "hevc", "h265",
	    "avc", "h264",
	    "aac", "mp3"
    ]
}