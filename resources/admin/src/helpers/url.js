const API_URL = process.env.NODE_ENV == 'development' ? process.env.VUE_APP_API_URL : window.location.origin + '/';
const FRONT_URL = process.env.NODE_ENV == 'development' ? process.env.VUE_APP_FRONT_URL : window.location.origin + '/';

export const apiUrl = (url) => {
    while (url[0] == '/') {
        url = url.substring(1)
    }

    return API_URL + url
}

export const get = () => {
    var vars = {}
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
        vars[key] = value
    })
    return vars
}

export const fbAvatarUrl = (userId) => {
    return 'http://graph.facebook.com/'+ userId +'/picture?type=square'
}

export const frontUrl = (url) => {
    while (url[0] == '/') {
        url = url.substring(1)
    }
    return FRONT_URL + url
}