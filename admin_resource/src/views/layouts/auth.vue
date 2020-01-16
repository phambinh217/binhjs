<template>
    <div>
        <div class="page">
            <div class="page-single">
                <div class="container">
                    <div class="row">
                        <div class="col col-login mx-auto">
                            <div class="text-center mb-6">
                                <img src="@/assets/logo.png" class="h-6" alt="">
                            </div>
                            <slot></slot>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <slot name="outside"></slot>
    </div>
</template>
