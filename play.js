const TsDemuxerJs = require('./mpeg');
global.makeTsDemuxerJs = (videoURL, config) => {
    let demuxer = new TsDemuxerJs.TsDemuxerJsMod(videoURL, config);
    return demuxer;
}