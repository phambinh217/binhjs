import Vue from 'vue'
import Vuex from 'vuex'
import createMutationsSharer from 'vuex-shared-mutations'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        auth: {
            check: false,
            user: {
                id: null,
                email: null,
            },
            accessToken: '',
            refreshToken: '',
        },

        autoload: {
            settings: {
                offlineAfterSecond: 3
            }
        },

        changePasswordModalOpen: false,
    },

    mutations: {
        setAuthAccessToken (state, token) {
            state.auth.accessToken = token
        },

        setAuthRefreshToken (state, token) {
            state.auth.refreshToken = token
        },

        setAuthUser (state, user) {
            for (let key in state.auth.user) {
                state.auth.user[key] = user[key]
            }
        },

        setAuthCheck (state, status) {
            state.auth.check = status
        },

        setAutoloadSetting (state, payload) {
            for (let key in state.autoload.settings) {
                state.autoload.settings[key] = payload[key]
            }
        },

        setChangePasswordModalOpen (state, payload) {
            state.changePasswordModalOpen = payload;
        }
    },

    actions: {
        setAuth ({ commit }, data) {
            let { accessToken, refreshToken, user } = data;
            commit('setAuthCheck', true)
            commit('setAuthAccessToken', accessToken)
            commit('setAuthRefreshToken', refreshToken)
            commit('setAuthUser', user);
        },

        setAutoloadSetting ({ commit }, payload) {
            commit('setAutoloadSetting', payload)
        },

        setChangePasswordModalOpen ({ commit }, payload) {
            commit('setChangePasswordModalOpen', payload)
        },

        logout ({ commit }) {
            commit('setAuthAccessToken', null)
            commit('setAuthRefreshToken', null)
            commit('setAuthUser', { id: null, email: null });
            commit('setAuthCheck', false);
        }
    },

    plugins: [
        createPersistedState({
            key: '__binhjs_admin__',
        }),
        createMutationsSharer({ predicate: [] })
    ],
})
