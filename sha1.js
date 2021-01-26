var Utf8 = require('cook-code-jazor-encoding').utf8;
var HMAC = require('./hmac.js');

var q = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"];
var p = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
var c = function(b) {
	var a = [];
	for (var d = 3; d >= 0; d--) {
		a.push((b >> (d * 8)) & 255)
	}
	return a
};
var l = function(b) {
	var a = "";
	for (var d = 7; d >= 0; d--) {
		a += p[(b >> (d * 4)) & 15]
	}
	return a
};
var n = function(b) {
	var e = ((b.length + 8) >> 6) + 1,
		a = new Array(e * 16);
	for (var d = 0; d < e * 16; d++) {
		a[d] = 0
	}
	for (d = 0; d < b.length; d++) {
		a[d >> 2] |= b[d] << (24 - (d & 3) * 8)
	}
	a[d >> 2] |= 128 << (24 - (d & 3) * 8);
	a[e * 16 - 1] = b.length * 8;
	return a
};
var o = function(e, a) {
	var b = (e & 65535) + (a & 65535);
	var d = (e >> 16) + (a >> 16) + (b >> 16);
	return (d << 16) | (b & 65535)
};
var k = function(b, a) {
	return (b << a) | (b >>> (32 - a))
};
var f = function(b, d, e, a) {
	if (b < 20) {
		return (d & e) | ((~d) & a)
	}
	if (b < 40) {
		return d ^ e ^ a
	}
	if (b < 60) {
		return (d & e) | (d & a) | (e & a)
	}
	return d ^ e ^ a
};
var m = function(a) {
	return (a < 20) ? 1518500249 : (a < 40) ? 1859775393 : (a < 60) ? -1894007588 : -899497514
};
var r = function(d, E) {
	E = E === true;
	var g = n(d);
	var a = new Array(80);
	var h = 1732584193;
	var s = -271733879;
	var b = -1732584194;
	var e = 271733878;
	var i = -1009589776;
	for (var G = 0; G < g.length; G += 16) {
		var v = h;
		var D = s;
		var H = b;
		var u = e;
		var F = i;
		for (var y = 0; y < 80; y++) {
			if (y < 16) {
				a[y] = g[G + y]
			} else {
				a[y] = k(a[y - 3] ^ a[y - 8] ^ a[y - 14] ^ a[y - 16], 1)
			}
			t = o(o(k(h, 5), f(y, s, b, e)), o(o(i, a[y]), m(y)));
			i = e;
			e = b;
			b = k(s, 30);
			s = h;
			h = t
		}
		h = o(h, v);
		s = o(s, D);
		b = o(b, H);
		e = o(e, u);
		i = o(i, F)
	}
	if (E) {
		return c(h).concat(c(s)).concat(c(b)).concat(c(e)).concat(c(i))
	} else {
		return l(h) + l(s) + l(b) + l(e) + l(i)
	}
};
var j = function(d) {
	var b = "";
	for (var a = 0; a < d.length; a++) {
		b += q[d[a]]
	}
	return b
};
exports.SHA1 = function(b, a) {
	if (typeof b == "string") {
		b = Utf8.getByteArray(b)
	}
	return r(b, a === true)
};
exports.HMACSHA1 = function(a, b, d) {
	return HMAC(r, 64, a, b, d)
}