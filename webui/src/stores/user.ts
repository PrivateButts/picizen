import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { provideApolloClient, useMutation, useLazyQuery, useQuery, useApolloClient } from '@vue/apollo-composable'
import { graphql } from '../gql'
import { apolloClient } from '../helpers/apollo'
import router from '../router'

provideApolloClient(apolloClient)


const { mutate: loginMutation } = useMutation(
    graphql(`
        mutation login($username: String!, $password: String!) {
            login(username: $username, password: $password) {
                id
                username
            }
        }
    `),
)

const { mutate: logoutMutation } = useMutation(graphql(`
    mutation logout {
        logout
    }
`))


export const useUserStore = defineStore('user', () => {
    const isAuthenticated = ref(false)
    const username = ref('')
    const id = ref('')
    const loaded = ref(false)

    async function checkUserStatus() {
        const userQueryResult = await apolloClient.query({
                query: graphql(`
                query userQuery{
                    me{
                        id
                        username
                    }
                }
            `)
        })

        if (userQueryResult.data.me) {
            isAuthenticated.value = true
            username.value = userQueryResult.data.me.username
            id.value = userQueryResult.data.me.id
            loaded.value = true
        }
    }
    

    async function login(uname: string, pword: string) {
        try {
            if (isAuthenticated.value) {
                throw new Error('Already logged in')
            }
            const result = await loginMutation({ username: uname, password: pword })
            if(result && result.data?.login){
                isAuthenticated.value = true
                username.value = result.data.login.username
                id.value = result.data.login.id
                loaded.value = true
                return true
            } else {
                throw new Error('Login failed, please try again')
            }
        } catch (e) {
            console.error(e)
            return false
        }
    }

    async function logout() {
        if (!isAuthenticated.value) {
            return
        }

        const result = await logoutMutation()

        if(result?.data?.logout){
            isAuthenticated.value = false
            username.value = ''
            id.value = ''
            router.push({ name: 'Login' })
        }
    }

    return {loaded, isAuthenticated, username, id, login, logout, checkUserStatus}
})