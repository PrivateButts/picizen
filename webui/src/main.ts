import 'vite/modulepreload-polyfill'

import "./styles/base.scss";
import * as bootstrap from 'bootstrap'

import { createApp, provide, h } from 'vue'
import App from './App.vue'

import router from './router'

import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { createApolloProvider } from '@vue/apollo-option'
import { createUploadLink } from 'apollo-upload-client'
import { progressFetch } from './helpers/progress-fetch';


// HTTP connection to the API
const uploadLink = createUploadLink({
    // You should use an absolute URL here
    uri: '/graphql/',
    fetch: progressFetch as any,
})


// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
    link: uploadLink,
    cache,
})

const apolloProvider = createApolloProvider({
    defaultClient: apolloClient,
})

const app = createApp({
    setup() {
        provide(DefaultApolloClient, apolloClient)
    },

    render: () => h(App),
})

app.use(router)
app.use(apolloProvider)

app.mount('#app')