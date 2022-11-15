import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('./pages/Home.vue')
    },
    {
        path: '/albums/',
        name: 'AlbumList',
        component: () => import('./pages/AlbumList.vue')
    },
]


const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router