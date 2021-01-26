var Utf8 = require('jazor-encoding').utf8;
module.exports = function(algorithm, blocksize, data, key, ra) {
	var ipad = [],
		opad = [];
	if (typeof data == "string") data = Utf8.getByteArray(data);
	if (typeof key == "string") key = Utf8.getByteArray(key);
	if (key.length > blocksize) key = algorithm(key, true);
	while (key.length < blocksize) {
		key.push(0);
	}
	for (var i = 0; i < blocksize; i++) {
		ipad[i] = key[i] ^ 0x36;
		opad[i] = key[i] ^ 0x5c;
	}
	data = algorithm(ipad.concat(data), true);
	data = opad.concat(data);
	return algorithm(data, ra === true);
};