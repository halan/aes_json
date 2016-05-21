const base64 = require('base64-arraybuffer')


module.exports = {
  importkey: function(password){
   return crypto.subtle.importKey('raw', new TextEncoder("utf-8").encode(password), 'PBKDF2', false, ['deriveKey']);
  },

  derivekey: function(salt, key){
    return crypto.subtle.deriveKey(
      {name: "PBKDF2", hash: "SHA-256", salt: salt, iterations: 64000},
      key, {name: "AES-CBC", length: 256}, false, ["encrypt", "decrypt"]
    );
  },

  encrypt: function(input, iv, key){
    return crypto.subtle.encrypt({ name: "AES-CBC", iv: iv}, key, new TextEncoder("utf-8").encode(input));
  },

  decrypt: function(data, iv, key){
    return crypto.subtle.decrypt({name: "AES-CBC", iv: iv,}, key, data);
  },

  implode: function(iv, salt, cipher){
    return [base64.encode(salt),
            base64.encode(iv),
            base64.encode(cipher)].join('.');
  },

  explode: function(str){
    var pack = str.split(".");
    return {
      salt: base64.decode(pack[0]),
      iv: base64.decode(pack[1]),
      ciphertext: base64.decode(pack[2])
     };
  },

  randchars: function(len) {
    return crypto.getRandomValues(new Uint8Array(len));
  }
}
