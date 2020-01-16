import axios from './axios'
import { apiUrl } from '@/helpers/url'

let headers = () => {
    return {
        'Content-Type': 'application/x-www-form-urlencoded',
    }
}

export default {
    autoload (data) {
        return axios.get(apiUrl('autoload'), {
            headers: headers()
        })
    },
}
