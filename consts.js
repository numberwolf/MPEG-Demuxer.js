module.exports = {
    DEFAULT_SAMPLERATE: 44100,
    DEFAULT_CHANNEL: 1,
    H264AUD : [0, 0, 0, 1, 0x09, 0xE0],
    H265AUD : [0, 0, 0, 1, 0x46, 0x01, 0x50],  // new Uint8Array(
    CODEC_OFFSET_TABLE : [	"hevc", "h265",
	                        "avc", "h264",
	                        "aac", "mp3"
	                     ]
}