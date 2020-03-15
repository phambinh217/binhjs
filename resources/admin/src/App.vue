<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
    import { mapActions } from 'vuex'

    export default {
        computed: {
            auth () {
                return this.$store.state.auth
            },

            authCheck () {
                return this.$store.state.auth.check
            }
        },

        data () {
            return {
            }
        },

        async created () {

        },

        methods: {
            logoutSocket () {
                socket.emit('logout')
            },
            ...mapActions(['setAutoloadSetting'])
        }
    }
</script>
