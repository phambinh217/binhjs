export const serialize = (obj, prefix) => {
    var str = [], p
    for (p in obj) {
        if (obj.hasOwnProperty(p)) {
            var k = prefix ? prefix + "[" + p + "]" : p,
            v = obj[p];
            str.push(
                (v !== null && typeof v === "object") ?
                    serialize(v, k) :
                    encodeURIComponent(k) + "=" + encodeURIComponent(v)
            )
        }
    }
    return str.join("&");
}

export const strSlug = (str) => {
    return str.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '')            // Trim - from end of text
        .replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a')
        .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e')
        .replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i')
        .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o')
        .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u')
        .replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y')
        .replace(/đ/gi, 'd')
        .replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '')
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
}

export const strRandom = (length) => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    if (!length) {
        var length = 5
    }

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

export const firstWord = (str) => {
    return str.split(' ').map(item => {
        if (item[0]) {
            return item[0].trim()
        }
        return null
    }).join('')
}

export const objectToString = (json) => {
    return JSON.stringify(json)
}

export const stringToObject = (string) => {
    return JSON.parse(string)
}

export const strIncrement = (string, demiter) => {
    if (isNaN(parseInt(string))) {
        const arr = string.split(demiter)
        const lastItem = arr[arr.length - 1]
        if (isNaN(parseInt(lastItem))) {
            string += demiter + '1'
        } else {
            arr.pop()
            arr.push((parseInt(lastItem) + 1).toString())
            string = arr.join(demiter)
        }
        return string
    } else {
        var string = parseInt(string) + 1
        return string.toString()
    }
}

export const strNoHtmlTag = (string) => {
    return $(string).text()
}

export const nl2br = (str, is_xhtml) => {
    if (typeof str === 'undefined' || str === null) {
        return '';
    }

    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}

export const onlyFirstUpperCase = (string) => {
    if (typeof string == 'string') {
        string = string.toLowerCase()
        return string.charAt(0).toUpperCase() + string.slice(1)
    }
    return ''
}

export const ucFirst = function (string) {
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

export const isUpperCase = function (string) {
    return string.toUpperCase() == string;
}

export const isLowerCase = function (string) {
    return string.toLowerCase() == string;
}
