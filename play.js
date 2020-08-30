const TsDemuxerJs = require('./mpeg');
global.makeTsDemuxerJs = (config) => {
    let demuxer = new TsDemuxerJs.TsDemuxerJsMod(config);
    return demuxer;
}