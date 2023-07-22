<template>
    <input type="text" v-model="shareInput" />
    <button @click="share">Share</button>
    <ul>
        <li v-for="user in photo.access">{{ user }}</li>
    </ul>
</template>

<script setup lang="ts">
import Choices from '../components/Choices.vue';
import { Photo } from '../gql/graphql';


const props = defineProps<{
    photo: Photo;
}>();
</script>
