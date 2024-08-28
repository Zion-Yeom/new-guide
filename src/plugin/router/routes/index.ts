import {RouteRecordRaw} from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: () => import(`@/views/Home.vue`)
    },
    {
        path: '/menu',
        name: 'SampleMenu',
        component: () => import(`@/views/SampleMenu.vue`)
    }
];

export default routes;
