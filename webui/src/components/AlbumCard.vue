<template>
    <div class="card" style="width: 18rem;height: 18rem;">
        <img :src="photo.imageUrl" :alt="album.title" class="card-img-top" />
        <div class="card-body">
            <h5 class="card-title">{{ album.title }}</h5>
            <p class="card-text">{{ album.description }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Album } from '../gql/graphql';
import LazyImage from './LazyImage.vue';

const props = defineProps<{
    album: Album
}>()

const photo = computed(() => {
    return props.album.photos[0]
})


</script>