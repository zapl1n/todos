import { createRouter, createWebHistory } from 'vue-router';

// Import your components here
// @ts-ignore
import Home from '../views/Home.vue';
// @ts-ignore
import About from '../views/About.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/about',
        name: 'About',
        component: About,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
