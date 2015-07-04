'use strict';

var should = require('should');
var path = require('path');
var dhash = require(path.join(__dirname, '/../index.js'));

function hamming(a, b) {
	var distance = 0;
	for (var i = 0; i < a.length; i++) {
		if (a[i] !== b[i]) {
			distance++;
		}
	}
	return distance;
}

describe('dhash', function() {

	it('should get 64 bit hash by default', function(done) {
		dhash(path.join(__dirname, '/images/face-high.jpg'), function(err, hash) {
			err.should.be.false();
			hash.length.should.equal(64 / 4); // 4 bits to a byte
			done();
		});
	});

	it('should get 256 bit hash if asked for', function(done) {
		dhash(path.join(__dirname, '/images/face-high.jpg'), function(err, hash) {
			err.should.be.false();
			hash.length.should.equal(256 / 4);
			done();
		}, 16);
	});

	it('should have similar hashes for low/high of same image', function(done) {
		dhash(path.join(__dirname, '/images/face-high.jpg'), function(err1, highHash) {
			err1.should.be.false();
			dhash(path.join(__dirname, '/images/face-low.jpg'), function(err2, lowHash) {
				err2.should.be.false();
				hamming(highHash, lowHash).should.be.below(2);
				done();
			});
		});
	});

	it('should have similar hashes for similar images', function(done) {
		dhash(path.join(__dirname, '/images/face-high.jpg'), function(err1, highHash) {
			err1.should.be.false();
			dhash(path.join(__dirname, '/images/face-with-nose.jpg'), function(err2, lowHash) {
				err2.should.be.false();
				hamming(highHash, lowHash).should.be.below(3);
				done();
			});
		});
	});

	it('should throw an error: Incomplete or corrupt PNG file', function(done) {
		dhash(new Buffer([]), function(err) {
			should.exist(err);
			done();
		});
	});

});
