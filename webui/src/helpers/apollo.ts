import { createApolloProvider } from '@vue/apollo-option'
import { createUploadLink } from 'apollo-upload-client'
import { progressFetch } from './progress-fetch';
import { ApolloClient, InMemoryCache, split } from '@apollo/client/core'
import { WebSocketLink } from "@apollo/client/link/ws"
import { getMainDefinition } from "@apollo/client/utilities"

console.log(import.meta.env.VITE_PUBLIC_URL)
const wsLink = new WebSocketLink({
    uri: import.meta.env.VITE_PUBLIC_URL.replace('http', 'ws'),
    options: {
        reconnect: true
    }
})

// HTTP connection to the API
const uploadLink = createUploadLink({
    // You should use an absolute URL here
    uri: import.meta.env.VITE_PUBLIC_URL + '/graphql/',
    fetch: progressFetch as any,
})


const link = split(
    // split based on operation type
    ({ query }) => {
        const definition = getMainDefinition(query)
        return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
        )
    },
    wsLink,
    uploadLink
)

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
export const apolloClient = new ApolloClient({
    link: link,
    cache,
})

export const apolloProvider = createApolloProvider({
    defaultClient: apolloClient,
})