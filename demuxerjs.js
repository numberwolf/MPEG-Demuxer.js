var TsDemuxerJs = require('./src/tsdemuxerjs-clz')
global.makeTsDemuxerJs = (videoURL, config) => {
    let demuxer = new TsDemuxerJs.TsDemuxerJsMod(videoURL, config);
    return demuxer;
}