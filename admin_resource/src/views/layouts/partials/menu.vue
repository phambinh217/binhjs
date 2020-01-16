<template>
    <div class="header collapse d-lg-flex p-0">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-3 ml-auto">
                    <form class="input-icon my-3 my-lg-0" :action="searchUrl" method="get">
                        <input type="text" name="q" class="form-control header-search" placeholder="Tìm kiếm" tabindex="1">
                        <div class="input-icon-addon">
                            <i class="fe fe-search"></i>
                        </div>
                    </form>
                </div>
                <div class="col-lg order-lg-first">
                    <ul class="nav nav-tabs border-0 flex-column flex-lg-row">
                        <li class="nav-item">
                            <router-link :to="{ name: 'home' }" class="nav-link"><i class="fe fe-home"></i> Tổng quan</a></router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{ name: 'product.index' }" class="nav-link"><i class="fe fe-box"></i> Sản phẩm</a></router-link>
                        </li>
                        <!-- <li class="nav-item">
                            <a href="javascript:void(0)" class="nav-link" data-toggle="dropdown" aria-expanded="false"><i class="fe fe-activity"></i> Báo cáo</a>
                            <div class="dropdown-menu dropdown-menu-arrow">
                                <a href="" class="dropdown-item">Báo cáo thu thập dữ liệu</a>
                                <a href="" class="dropdown-item">Danh sách sản phẩm tăng giá bố láo</a>
                            </div>
                        </li> -->
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { frontUrl } from '@/helpers/url'

    export default {
        computed: {
            searchUrl () {
                return frontUrl('/search')
            }
        }
    }
</script>
