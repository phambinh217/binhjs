<template>
    <div class="modal fade" role="dialog" :id="id" data-backdrop="static">
        <div class="modal-dialog" :class="size" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ title }}</h5>
                    <button type="button" class="close" @click="close"></button>
                </div>
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script>
    import { strRandom } from '@/helpers/string'

    export default {
        props: {
            open: {
                type: Boolean,
                default: false,
            },

            title: {},

            id: {
                type: String,
                default () {
                    return strRandom()
                }
            },

            size: {
                type: String,
                default: ''
            }
        },

        computed: {
            modal () {
                return $('#' + this.id)
            }
        },

        mounted () {
            if (this.open == true) {
                this.modal.modal('show')
            }
        },

        methods: {
            close () {
                this.$emit('close')
            }
        },

        watch: {
            open (value) {
                if (this.open) {
                    this.modal.modal('show')
                } else {
                    this.modal.modal('hide')
                }
            }
        }
    }
</script>