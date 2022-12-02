import { createApolloProvider } from '@vue/apollo-option'
import { createUploadLink } from 'apollo-upload-client'
import { progressFetch } from './progress-fetch';
import { ApolloClient, InMemoryCache } from '@apollo/client/core'


// HTTP connection to the API
const uploadLink = createUploadLink({
    // You should use an absolute URL here
    uri: '/graphql/',
    fetch: progressFetch as any,
})


// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
export const apolloClient = new ApolloClient({
    link: uploadLink,
    cache,
})

export const apolloProvider = createApolloProvider({
    defaultClient: apolloClient,
})