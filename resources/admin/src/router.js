import Vue from 'vue'
import Router from 'vue-router'
import store from './store';

Vue.use(Router)

let router = new Router({
    routes: [
        // { path: '/', name: 'home', component: () => import('@/views/index.vue'), meta: { auth: true } },
        { path: '/login', name: 'auth.login', component: () => import('@/views/auth/login.vue') },
        { path: '/', name: 'home', component: () => import('@/views/home.vue'), meta: { auth: true } },
    ]
})

router.beforeEach((to, from, next) => {
    if (to.meta.auth == true && store.state.auth.check == false) {
        return next({ name: 'auth.login' });
    }

    return next();
});

export default router;
