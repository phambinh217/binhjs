<template>
    <nav aria-label="Page navigation example" v-if="totalPage > 1">
        <ul class="pagination justify-content-center">
            <template v-if="current > 1">
                <li class="page-item"><a class="page-link" @click.prevent="firstEvent" href="#first">Trang đầu</a></li>
                <li class="page-item"><a class="page-link"@click.prevent="prevEvent" href="#prev">Trang trước</a></li>
            </template>
            <li class="page-item" v-for="i in minToMax" :key="i" :class="{ active: current === i }">
                <a class="page-link" @click.prevent="changeEvent(i)" href="#change">{{ i }}</a>
            </li>
            <template v-if="current < totalPage">
                <li class="page-item"><a class="page-link" @click.prevent="nextEvent" href="#next">Trang tiếp</a></li>
                <li class="page-item"><a class="page-link" @click.prevent="lastEvent" href="#last">Trang cuối</a></li>
            </template>
        </ul>
    </nav>
</template>

<script>
    export default {
        props: {
            total: {},
            current: {},
            perpage: {},
            range: {
                type: Number,
                default: 9
            }
        },

        computed: {
            show() {
                return this.total > 0
            },

            totalPage () {
                return Math.ceil(this.total/this.perpage)
            },

            ranges () {
                var start = 0;
                var min = 0;
                var max = 0;

                if (this.perpage < this.total) {
                    start = (this.current - 1) * this.perpage
                    var middle = Math.ceil(this.range/2)
                    if (this.totalPage < this.range) {
                        min = 1
                        max = this.totalPage
                    } else {
                        min = this.current - middle + 1
                        max = this.current + middle - 1
                        if (min < 1) {
                            min = 1
                            max = this.range
                        } else if (max > this.totalPage) {
                            max = this.totalPage
                            min = this.totalPage - this.range + 1
                        }
                    }
                }

                return { min: min, max: max }
            },

            min () {
                return this.ranges.min
            },

            max () {
                return this.ranges.max
            },

            minToMax () {
                var array = []
                for (var i = this.min; i <= this.max; i++) {
                    array.push(i)
                }

                return array
            }
        },

        methods: {
            nextEvent () {
                this.$emit('change', this.current + 1)
            },

            prevEvent () {
                this.$emit('change', this.current - 1)
            },

            firstEvent () {
                this.$emit('change', 1)
            },

            lastEvent () {
                this.$emit('change', this.totalPage)
            },

            changeEvent (page) {
                this.$emit('change', page)
            }
        }
    }
</script>