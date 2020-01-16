<template>
    <auth-layout>
        <div class="alert alert-danger" v-if="errorMessage">{{ errorMessage }}</div>
        <form class="card" action="" method="post" @submit.prevent="submitFormLogin">
            <div class="card-body p-6">
                <div class="card-title">Đăng nhập</div>
                <div class="form-group">
                    <label class="form-label">Email</label>
                    <input type="email" class="form-control" placeholder="Nhập email" v-model="email">
                </div>
                <div class="form-group">
                    <label class="form-label">
                        Mật khẩu
                    </label>
                    <input type="password" class="form-control" placeholder="Nhập mật khẩu" v-model="password">
                </div>
                <div class="form-footer">
                    <button type="submit" class="btn btn-primary btn-block" :class="{ 'btn-loading': submitting }">Đăng nhập</button>
                </div>
            </div>
        </form>
    </auth-layout>
</template>
<script>
    import authLayout from '@/views/layouts/auth'
    import authApi from '@/api/auth'
    import { mapActions } from 'vuex'

    export default {
        components: {
            authLayout,
        },

        data () {
            return {
                email: '',
                password: '',
                submitting: false,
                errorMessage: '',
            }
        },

        created () {

        },

        methods: {
            async submitFormLogin () {
                this.submitting = true;
                this.errorMessage = '';

                let { data: response } = await authApi.login({
                    email: this.email,
                    password: this.password
                });

                this.submitting = false;

                if (response.status == 'failed') {
                    this.errorMessage = response.message;
                } else {
                    this.setAuth({
                        accessToken: response.accessToken,
                        refreshToken: response.refreshToken,
                        user: {
                            id: response.user.id,
                            email: response.user.email,
                        }
                    });
                    this.$router.push({ name: 'home' });
                }

            },
            ...mapActions(['setAuth']),
        }
    }
</script>
