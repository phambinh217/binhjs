<template>
    <span class="avatar" :class="color" style="color: white">{{ letterAvatar }}</span>
</template>
<script>
    import { strSlug } from '@/helpers/string'

    export default {
        props: {
            name: {
                type: String,
                default: 'a'
            }
        },

        data () {
            return {
                firstLetter: 'A',
                alphabets: 'asdfghjklqưertyuiopzxcvbn',
                colors: [
                    'bg-blue', 'bg-azure', 'bg-indigo', 'bg-purple', 'bg-pink', 'bg-red', 'bg-orange', 'bg-yellow',
                    'bg-lime', 'bg-green', 'bg-teal', 'bg-cyan'
                ]
            }
        },

        computed: {
            letterAvatar () {
                return this.firstLetter.toUpperCase()
            },

            color () {
                let charIndex = this.alphabets.split('').findIndex(c => c == this.firstLetter) + this.name.length

                let countedColor = this.colors.length
                let colorIndex = (countedColor % charIndex) - 1
                return this.colors[colorIndex]
            }
        },

        created () {
            if (this.name) {
                this.firstLetter = String(this.name[0]).toLowerCase()
            }
        },

        watch: {
            name () {
                this.firstLetter = String(this.name[0]).toLowerCase()
            }
        }
    }
</script>