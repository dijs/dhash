dhash
=========

dHash - image hash implementation for node

### Usage

```

var dhash = require('dhash');

dhash('/path/to/image', function(err, hash){
	// Do something with hash hex-string...
});

// Optional last argument for hash size in bytes (Default: 8)

```