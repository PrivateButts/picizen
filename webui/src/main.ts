import 'vite/modulepreload-polyfill'

import "./styles/base.scss";
import * as bootstrap from 'bootstrap'

import { createApp, provide, h } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { apolloProvider, apolloClient } from './helpers/apollo'


const pinia = createPinia()

const app = createApp({
    setup() {
        provide(DefaultApolloClient, apolloClient)
    },

    render: () => h(App),
})

app.use(router)
app.use(pinia)
app.use(apolloProvider)

app.mount('#app')