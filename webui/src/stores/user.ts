import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useMutation } from '@vue/apollo-composable'
import { graphql } from '../gql'

const { mutate: logoutMutation } = useMutation(graphql(`
    mutation logout {
        logout
    }
`))

export const useUserStore = defineStore('user', () => {
    const isAuthenticated = ref(false)
    const username = ref('')
    const id = ref(0)

    function login(username: string, password: string) {
        if (isAuthenticated.value) {
            return
        }
    }

    function logout() {
        if (!isAuthenticated.value) {
            return
        }

        logoutMutation().then(() => {
            isAuthenticated.value = false
            username.value = ''
            id.value = 0
        }
    }
})