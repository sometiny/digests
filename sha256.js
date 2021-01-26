var Utf8 = require('jazor-encoding').utf8;
var HMAC = require('./hmac.js');


function g(v, w) {
	return ((w >>> v) | (w << (32 - v)))
}

function b(v, w, x) {
	return ((v & w) ^ (~v & x))
}

function f(v, w, x) {
	return ((v & w) ^ (v & x) ^ (w & x))
}

function p(v) {
	return (g(2, v) ^ g(13, v) ^ g(22, v))
}

function r(v) {
	return (g(6, v) ^ g(11, v) ^ g(25, v))
}

function o(v) {
	return (g(7, v) ^ g(18, v) ^ (v >>> 3))
}

function q(v) {
	return (g(17, v) ^ g(19, v) ^ (v >>> 10))
}

function k(w, v) {
	return (w[v & 15] += q(w[(v + 14) & 15]) + w[(v + 9) & 15] + o(w[(v + 1) & 15]))
}
var e = new Array(1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298);
var d, c, a;
var m = "0123456789abcdef";

function h(x, y) {
	var v = (x & 65535) + (y & 65535);
	var w = (x >> 16) + (y >> 16) + (v >> 16);
	return (w << 16) | (v & 65535)
}

function n() {
	d = new Array(8);
	c = new Array(2);
	a = new Array(64);
	c[0] = c[1] = 0;
	d[0] = 1779033703;
	d[1] = 3144134277;
	d[2] = 1013904242;
	d[3] = 2773480762;
	d[4] = 1359893119;
	d[5] = 2600822924;
	d[6] = 528734635;
	d[7] = 1541459225
}

function s() {
	var x, y, z, A, B, C, D, E, H, I;
	var J = new Array(16);
	x = d[0];
	y = d[1];
	z = d[2];
	A = d[3];
	B = d[4];
	C = d[5];
	D = d[6];
	E = d[7];
	for (var F = 0; F < 16; F++) {
		J[F] = ((a[(F << 2) + 3]) | (a[(F << 2) + 2] << 8) | (a[(F << 2) + 1] << 16) | (a[F << 2] << 24))
	}
	for (var G = 0; G < 64; G++) {
		H = E + r(B) + b(B, C, D) + e[G];
		if (G < 16) {
			H += J[G]
		} else {
			H += k(J, G)
		}
		I = p(x) + f(x, y, z);
		E = D;
		D = C;
		C = B;
		B = h(A, H);
		A = z;
		z = y;
		y = x;
		x = h(H, I)
	}
	d[0] += x;
	d[1] += y;
	d[2] += z;
	d[3] += A;
	d[4] += B;
	d[5] += C;
	d[6] += D;
	d[7] += E
}

function t(w, z) {
	var x, y, v = 0;
	y = ((c[0] >> 3) & 63);
	var B = (z & 63);
	if ((c[0] += (z << 3)) < (z << 3)) {
		c[1] ++
	}
	c[1] += (z >> 29);
	for (x = 0; x + 63 < z; x += 64) {
		for (var A = y; A < 64; A++) {
			a[A] = w[v++]
		}
		s();
		y = 0
	}
	for (var A = 0; A < B; A++) {
		a[A] = w[v++]
	}
}

function l() {
	var w = ((c[0] >> 3) & 63);
	a[w++] = 128;
	if (w <= 56) {
		for (var v = w; v < 56; v++) {
			a[v] = 0
		}
	} else {
		for (var v = w; v < 64; v++) {
			a[v] = 0
		}
		s();
		for (var v = 0; v < 56; v++) {
			a[v] = 0
		}
	}
	a[56] = (c[1] >>> 24) & 255;
	a[57] = (c[1] >>> 16) & 255;
	a[58] = (c[1] >>> 8) & 255;
	a[59] = c[1] & 255;
	a[60] = (c[0] >>> 24) & 255;
	a[61] = (c[0] >>> 16) & 255;
	a[62] = (c[0] >>> 8) & 255;
	a[63] = c[0] & 255;
	s()
}

function i() {
	var w = 0;
	var x = new Array(32);
	for (var v = 0; v < 8; v++) {
		x[w++] = ((d[v] >>> 24) & 255);
		x[w++] = ((d[v] >>> 16) & 255);
		x[w++] = ((d[v] >>> 8) & 255);
		x[w++] = (d[v] & 255)
	}
	return x
}

function j() {
	var x = new String();
	for (var v = 0; v < 8; v++) {
		for (var w = 28; w >= 0; w -= 4) {
			x += m.charAt((d[v] >>> w) & 15)
		}
	}
	return x
}

function u(v, w) {
	n();
	t(v, v.length);
	l();
	if (w) {
		return i()
	} else {
		return j()
	}
}
exports.SHA256 = function(w, v) {
	if (typeof w == "string") {
		w = Utf8.getByteArray(w)
	}
	return u(w, v === true)
};
exports.HMACSHA256 = function(v, w, x) {
	return HMAC(u, 64, v, w, x)
}