<template>
    <label class="custom-switch">
        <input type="checkbox" :name="name" class="custom-switch-input" :checked="checked" @change="emitChangeEvent">
        <span class="custom-switch-indicator"></span>
        <span class="custom-switch-description">
            <slot></slot>
        </span>
    </label>
</template>

<script>
    export default {
        props: {
            name: {
                type: String,
                default: ''
            },

            checked: {
                type: Boolean,
                default: false,
            }
        },

        methods: {
            emitChangeEvent ($event) {
                this.$emit('change', $event)
            }
        }
    }
</script>