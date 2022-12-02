<template>
    <div class="container mt-1">
        <h1>Welcome Back!</h1>
        <form @submit.prevent="login()">
            <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input type="text" class="form-control" id="username" v-model="username">
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" v-model="password">
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '../stores/user';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const username = ref('');
const password = ref('');

function login() {
    userStore.login(username.value, password.value).then(() => {
        if (userStore.isAuthenticated) {
            router.push({
                name: 'Home'
            })
        }
    }).catch(() => {
        alert('Login failed');
    });
}
</script>