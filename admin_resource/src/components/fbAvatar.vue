<template>
    <span class="avatar" :class="classes" :style="style"></span>
</template>
<script>
    import { fbAvatarUrl } from '@/helpers/url'

    export default {
        props: {
            fbId: {}
        },

        computed: {
            fbAvatarUrl () {
                if (this.fbId) {
                    return fbAvatarUrl(this.fbId)
                }
                return null
            },

            classes () {
                if (this.fbAvatarUrl) {
                    return null
                }

                return 'avatar-placeholder'
            },

            style () {
                if (this.fbAvatarUrl) {
                    return {
                        backgroundImage: `url(${this.fbAvatarUrl})`
                    }
                }
            }
        }
    }
</script>