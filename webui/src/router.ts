import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('./pages/Home.vue')
    },
    {
        path: '/photos/',
        name: 'PhotoList',
        component: () => import('./pages/PhotoList.vue')
    },
    {
        path: '/photos/:id/',
        name: 'PhotoDetail',
        component: () => import('./pages/PhotoDetail.vue')
    },
    {
        path: '/albums/',
        name: 'AlbumList',
        component: () => import('./pages/AlbumList.vue')
    },
    {
        path: '/upload/',
        name: 'Upload',
        component: () => import('./components/Upload.vue')
    },
]


const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router