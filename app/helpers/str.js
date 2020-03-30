'use strict';

function strSlug (str) {
    return str.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '')
        .replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a')
        .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e')
        .replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i')
        .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o')
        .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u')
        .replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y')
        .replace(/đ/gi, 'd')
        .replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '')
        .replace(/[^\w\-]+/g, '')
}

function strContains (str, contains) {
    str = strSlug(str).replace(/-/g, ' ');
    let groupedFound = [];

    for (let i = 0; i < contains.length; i++) {
        let keywords = contains[i];
        for (let j in keywords) {
            let keyword = keywords[j];
            if (str.includes(keyword)) {
                groupedFound.push(true);
                break;
            }
        }
    }

    let found = groupedFound.length == contains.length;

    return found;
}

function nl2br (str, is_xhtml) {
    if (typeof str === 'undefined' || str === null) {
        return '';
    }
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}

function ucFirst (string) {
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

function stripTags (str) {
    return str.replace(/(<([^>]+)>)/ig, '');
}

function strRandom (length) {
   let result = '';
   let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   let charactersLength = characters.length;
   for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }

   return result;
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
    rtrim,
    serialize,
    camelCase,
    uuid,
    strRandom,
    strSlug,
    strContains,
    nl2br,
    ucFirst,
    stripTags,
}
