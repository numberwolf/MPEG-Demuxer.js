const MPEG_JS = require('./mpeg');
global.makeTsDemuxerJs = (config) => {
    let demuxer = new MPEG_JS.MPEG_JS(config);
    return demuxer;
}