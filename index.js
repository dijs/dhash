var
gm = require('gm'),
	PNG = require('png-js'),
	toArray = require('stream-to-array'),
	DEFAULT_HASH_SIZE = 8,
	PIXEL_LENGTH = 4;

function px(pixels, width, x, y) {
	return pixels[width * PIXEL_LENGTH * y + x * PIXEL_LENGTH];
}

function binaryToHex(s) {
	var output = '';
	for (var i = 0; i < s.length; i += 4) {
		var bytes = s.substr(i, 4);
		var decimal = parseInt(bytes, 2);
		var hex = decimal.toString(16);
		output += hex.toUpperCase();
	}
	return output;
}

module.exports = function(path, callback, hashSize) {
	var height = hashSize || DEFAULT_HASH_SIZE;
	var width = height + 1;
	// Covert to small gray image
	gm(path)
		.colorspace('GRAY')
		.resize(width, height, '!')
		.stream('png', function(err, stream) {
			if (err) {
				callback && callback(err);
			} else {
				// Get pixel data
				toArray(stream, function(err, arr) {
					if (err) {
						callback && callback(err);
					} else {
						new PNG(Buffer.concat(arr)).decode(function(pixels) {
							// Compare adjacent pixels.
							var difference = '';
							for (var row = 0; row < height; row++) {
								for (var col = 0; col < height; col++) { // height is not a mistake here...
									var left = px(pixels, width, col, row);
									var right = px(pixels, width, col + 1, row);
									difference += left < right ? 1 : 0;
								}
							}
							// Convert difference to hex string
							callback && callback(false, binaryToHex(difference));
						});
					}
				});

			}
		});
}