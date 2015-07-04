[![NPM Version](https://img.shields.io/npm/v/dhash.svg)](https://www.npmjs.com/package/dhash)
[![Build Status](https://travis-ci.org/dijs/dhash.svg)](https://travis-ci.org/dijs/dhash)

# dhash (difference hash)

dHash - image hash implementation for node

### Install

```
npm install dhash
```

**Requires (Image Magick)[http://imagemagick.org/]**

### Usage

```js
var dhash = require('dhash');

dhash('/path/to/image', function(err, hash){
	// Do something with hash hex-string...
});

// Optional last argument for hash size in bytes (Default: 8)

```
