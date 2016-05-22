import * as base64 from 'base64-arraybuffer';

export function importkey(password){
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder("utf-8").encode(password),
    'PBKDF2',
    false,
    ['deriveKey']
  );
};

export function derivekey(salt, key){
  return crypto.subtle.deriveKey(
    {name: "PBKDF2", hash: "SHA-256", salt: salt, iterations: 64000},
    key, {name: "AES-CBC", length: 256}, false, ["encrypt", "decrypt"]
  );
};

export function encrypt(input, iv, key){
  return crypto.subtle.encrypt({ name: "AES-CBC", iv: iv}, key, new TextEncoder("utf-8").encode(input));
};

export function decrypt(data, iv, key){
  return crypto.subtle.decrypt({name: "AES-CBC", iv: iv,}, key, data);
};

export function implode(iv, salt, cipher){
  return [base64.encode(salt),
          base64.encode(iv),
          base64.encode(cipher)].join('.');
};

export function explode(str){
  var pack = str.split(".");
  return {
    salt: base64.decode(pack[0]),
    iv: base64.decode(pack[1]),
    ciphertext: base64.decode(pack[2])
   };
};

export function randchars(len) {
  return crypto.getRandomValues(new Uint8Array(len));
};
