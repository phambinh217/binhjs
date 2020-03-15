import store from '@/store'

export default {
    getAuthHeaders () {
        return {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${store.state.auth.accessToken}`
        }
    }
}
