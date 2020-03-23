'use strict';

function strRandom (length) {
   let result = '';
   let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   let charactersLength = characters.length;
   for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }

   return result;
}

function ucFirst (string) {
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

function uuid (salt) {
    let now = new Date();
    return String(salt) + now.getDate() + strRandom(5);
}

function rtrim (str, character) {
  str = str.trim();
  while (str[0] == character) {
      str = str.substring(1)
  }

  return str;
}

function serialize (obj, prefix) {
    let str = [], p;
    for (p in obj) {
        if (obj.hasOwnProperty(p)) {
            let k = prefix ? prefix + '[' + p + ']' : p,
            v = obj[p];
            str.push(
                (v !== null && typeof v === 'object') ?
                    serialize(v, k) :
                    encodeURIComponent(k) + '=' + encodeURIComponent(v)
                    )
        }
    }
    return str.join('&');
}

function camelCase (text) {
  text = text.replace(/[-_\s.]+(.)?/g, (_, c) => c ? c.toUpperCase() : '');
  return text.substr(0, 1).toLowerCase() + text.substr(1);
}

module.exports = {
  strRandom,
  ucFirst,
  uuid,
  rtrim,
  serialize,
  camelCase,
}
