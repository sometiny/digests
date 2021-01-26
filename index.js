var MD5 = require('./md5.js');
var SHA1 = require('./sha1.js');
var SHA256 = require('./sha256.js');

module.exports = {
	MD5 : MD5.MD5,
	HMACMD5 : MD5.HMACMD5,
	SHA1 : SHA1.SHA1,
	HMACSHA1 : SHA1.HMACSHA1,
	SHA256 : SHA256.SHA256,
	HMACSHA256 : SHA256.HMACSHA256,
};