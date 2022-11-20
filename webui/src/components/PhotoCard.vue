<template>
    <div class="card photocard">
        <LazyImage
            :width="props.photo.image.width"
            :height="props.photo.image.height"
            :hash="props.photo.blurhash!"
            :src="props.photo.image.url"
            :imgAlt="props.photo.title"
            :style="{'aspect-ratio': props.photo.image.width/props.photo.image.height}"
        />
        <div class="card-img-overlay text-light bg-dark bg-gradient bg-opacity-50 hover">
            <h6 class="card-title">{{ props.photo.title }}</h6>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Photo } from "../gql/graphql";
import LazyImage from "./LazyImage.vue"

const props = defineProps<{
    photo: Photo
}>()

</script>

<style scoped>
    .hover{
        opacity: 0;
        transition: opacity 0.3s;
    }

    .hover:hover {
        opacity: 1;
    }
</style>