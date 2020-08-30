--------------------------------------------------
# mpeg.js

> A MPEG Media Box demuxer framework

### Feature

* Support Mpeg-2 TS demux operation
	* get NALU header
	* get VLC data
	* get frame packet
	* get duration of TS
	* get sample rate/frame rate of TS
	* get media info
	* support input data by URI/Uint8 buffer!

[![npm version](https://badge.fury.io/js/mpeg.js.svg)](https://www.npmjs.com/package/mpeg.js)

* Contact: (QQ:531365872 ,Discord:numberwolf#8694)

* LICENSE : GPL-3.0 https://www.gnu.org/licenses/gpl-3.0.md

> If mpeg.js help you, you can click star button, it offered me more impetus to develop h265webjs!  

> `~^_^~`    

### Setup

- step1. install the mpeg.js 

https://www.npmjs.com/package/mpeg.js

```bash
npm i mpeg.js
```

- step2. download the wasm(or get it from node_modules)

> download from https://github.com/numberwolf/MPEG-Demuxer.js

> get it from node_modules          
> copy it to your js dist dir (which require the tsdemuxerjs)      
```bash
cp node_modules/mpeg.js/demuxer/missilets.wasm ./dist/
```

### Use it!

- See github

> index.html

> play.js

- Example Demo

> npm start

----------------------------------------
