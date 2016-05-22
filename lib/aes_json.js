'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.importkey = importkey;
exports.derivekey = derivekey;
exports.encrypt = encrypt;
exports.decrypt = decrypt;
exports.implode = implode;
exports.explode = explode;
exports.randchars = randchars;

var _base64Arraybuffer = require('base64-arraybuffer');

var base64 = _interopRequireWildcard(_base64Arraybuffer);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function importkey(password) {
  return crypto.subtle.importKey('raw', new TextEncoder("utf-8").encode(password), 'PBKDF2', false, ['deriveKey']);
};

function derivekey(salt, key) {
  return crypto.subtle.deriveKey({ name: "PBKDF2", hash: "SHA-256", salt: salt, iterations: 64000 }, key, { name: "AES-CBC", length: 256 }, false, ["encrypt", "decrypt"]);
};

function encrypt(input, iv, key) {
  return crypto.subtle.encrypt({ name: "AES-CBC", iv: iv }, key, new TextEncoder("utf-8").encode(input));
};

function decrypt(data, iv, key) {
  return crypto.subtle.decrypt({ name: "AES-CBC", iv: iv }, key, data);
};

function implode(iv, salt, cipher) {
  return [base64.encode(salt), base64.encode(iv), base64.encode(cipher)].join('.');
};

function explode(str) {
  var pack = str.split(".");
  return {
    salt: base64.decode(pack[0]),
    iv: base64.decode(pack[1]),
    ciphertext: base64.decode(pack[2])
  };
};

function randchars(len) {
  return crypto.getRandomValues(new Uint8Array(len));
};