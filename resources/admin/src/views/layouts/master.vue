<template>
    <div>
        <div class="page">
            <div class="flex-fill">
                <header-partial />
                <div class="my-3 my-md-5">
                    <div class="container">
                        <slot></slot>
                    </div>
                </div>
            </div>
            <footer-partial />
        </div>
        <slot name="outside"></slot>
        <change-password-modal :open="changePasswordModalOpen" @close="closeChangePasswordModal" />
    </div>
</template>
<script>
    import footerPartial from './partials/footer';
    import headerPartial from './partials/header';
    import changePasswordModal from '@/views/auth/changePasswordModal';
    import { mapActions } from 'vuex';

    export default {
        components: {
            footerPartial,
            headerPartial,
            changePasswordModal
        },

        computed: {
            changePasswordModalOpen () {
                return this.$store.state.changePasswordModalOpen;
            }
        },

        created () {
            this.setChangePasswordModalOpen(false);
        },

        methods: {
            closeChangePasswordModal () {
                this.setChangePasswordModalOpen(false);
            },
            ...mapActions(['setChangePasswordModalOpen'])
        }
    }
</script>
