<template>
    <div>
        <div class="header py-4">
            <div class="container">
                <div class="d-flex">
                    <a class="header-brand" href="">
                        <img src="@/assets/logo.png" class="header-brand-img" alt="AnoMess">
                    </a>
                    <div class="nav-item d-none d-md-flex ml-auto">
                        <a :href="frontUrl" class="btn btn-sm btn-outline-primary" target="_blank">Trang chủ</a>
                    </div>
                    <div class="d-flex order-lg-2">
                        <span class="nav-link pr-0 leading-none">
                            <span class="ml-2 d-none d-lg-block">
                                <span class="text-default small">{{ user.email }}</span>
                                <small class="d-block mt-2 small">
                                    <a href="" @click.prevent="openChangePasswordModal">[Đổi mật khẩu]</a>
                                    <a href="" class="text-danger" @click.prevent="logoutUser">[Đăng xuất]</a>
                                </small>
                            </span>
                        </span>
                    </div>
                    <a href="#" class="header-toggler d-lg-none ml-3 ml-lg-0" data-toggle="collapse" data-target="#headerMenuCollapse">
                        <span class="header-toggler-icon"></span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    import headerMenu from './menu';
    import { frontUrl } from '@/helpers/url';

    export default {
        components: {
            headerMenu,
        },

        computed: {
            frontUrl () {
                return frontUrl('/')
            },

            user () {
                return this.$store.state.auth.user
            }
        },

        methods: {
            logoutUser () {
                this.logout()
                this.$router.push({ name: 'auth.login' });
            },

            openChangePasswordModal () {
                this.setChangePasswordModalOpen(true);
            },

            ...mapActions(['logout', 'setChangePasswordModalOpen'])
        }
    }
</script>