'use strict';

module.exports = {
    strSlug (str) {
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
    },

    nl2br (str, is_xhtml) {
        if (typeof str === 'undefined' || str === null) {
            return '';
        }
        var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
        return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
    },

    contains (str, contains) {
        str = this.strSlug(str).replace(/-/g, ' ');
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
    },

    ucFirst (string) {
        return string[0].toUpperCase() + string.slice(1).toLowerCase();
    },

    strip (str) {
        return str.replace(/(<([^>]+)>)/ig, '');
    }
}
