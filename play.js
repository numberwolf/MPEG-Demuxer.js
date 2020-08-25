var TsDemuxerJs = require('./src/tsdemuxerjs')
global.makeTsDemuxerJs = (videoURL, config) => {
    let demuxer = new TsDemuxerJs.TsDemuxerJsMod(videoURL, config);
    return demuxer;
}