import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from './stores/user'


const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('./pages/Home.vue')
    },
    {
        path: '/photos/',
        name: 'PhotoList',
        component: () => import('./pages/PhotoDateList.vue')
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
    {
        path: '/login/',
        name: 'Login',
        component: () => import('./pages/Login.vue')
    },
]


const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(async (to, from) => {
    if(to.name === 'Login'){
        return true
    }

    const userStore = useUserStore()
    if(!userStore.loaded){
        console.log('checking user status')
        await userStore.checkUserStatus()
    }
    if(!userStore.isAuthenticated){
        return { name: 'Login' }
    }
    return true
})

export default router