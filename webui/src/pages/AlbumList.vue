<template>
    <h1>Album List</h1>
    <h1>{{ msg }}</h1>

    <div class="card">
        <button type="button" @click="count++">count is {{ count }}</button>
    </div>
    <p>
        <router-link :to="{name: 'Home'}">Home</router-link>
    </p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<style scoped>
.read-the-docs {
    color: #888;
}
</style>
