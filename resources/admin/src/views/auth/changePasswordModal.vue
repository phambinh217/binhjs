<template>
    <modal title="Đổi mật khẩu" :open="open" @close="closeModal">
        <form @submit.prevent="changePassword">
            <div class="modal-body">
                <div class="form-group row">
                    <label class="col-sm-4 col-form-label">Mật khẩu cũ</label>
                    <div class="col-sm-8">
                        <input type="password" class="form-control" autocomplete="off">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-4 col-form-label">Mật khẩu mới</label>
                    <div class="col-sm-8">
                        <input type="password" class="form-control" autocomplete="off">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-4 col-form-label">Nhập lại mật khẩu mới</label>
                    <div class="col-sm-8">
                        <input type="password" class="form-control" autocomplete="off">
                    </div>
                </div>
            </div>
            <div class="modal-footer text-right">
                <button class="btn btn-secondary" @click.prevent="closeModal">Hủy</button>
                <button class="btn btn-primary">Thay đổi</button>
            </div>
        </form>
    </modal>
</template>
<script>
    import modal from '@/components/modal';

    export default {
        components: {
            modal
        },

        props: {
            open: {
                type: Boolean,
                default: false
            }
        },

        methods: {
            closeModal () {
                this.$emit('close');
            },

            changePassword () {

            }
        }
    }
</script>