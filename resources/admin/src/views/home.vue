<template>
    <master-layout>
        <div class="page-header">
            <h1 class="page-title">Trang chủ</h1>
        </div>
        <div class="card">
            <div class="card-body">
                Hello world
            </div>
        </div>
    </master-layout>
</template>
<script>
    import masterLayout from '@/views/layouts/master'

    export default {
        components: {
            masterLayout,
        },

        created () {
        }
    }
</script>
