<template>
    <div class="card">
        <img v-if="album.coverPhoto" :src="album.coverPhoto.imageUrl" :alt="album.title"
            class="card-img-top" />
        <div class="card-body">
            <h5 class="card-title">{{ album.title }}</h5>
            <div class="row justify-between">
                <p class="card-text col">{{ formatDate(album.createdAt) }}</p>
                <p class="card-text col text-end">{{ album.photoCount }} Photos</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card-img-top {
    height: 18rem;
    object-fit: cover;
}
</style>

<script setup lang="ts">
import { Album } from '../gql/graphql';

const props = defineProps<{
    album: Album
}>()

function formatDate(date: string) {
    return new Date(date).toLocaleDateString();
}

</script>
