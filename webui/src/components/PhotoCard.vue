<template>
    <div class="card photocard">
        <LazyImage
            :width="props.image.width"
            :height="props.image.height"
            :hash="props.image.blurhash"
            :src="props.image.url"
            :imgAlt="props.image.title"
            :style="{'aspect-ratio': props.image.width/props.image.height}"
        />
    </div>
</template>

<script setup lang="ts">
import LazyImage from "./LazyImage.vue"

interface ImageType {
    url: string
    title: string
    blurhash: string
    width: number
    height: number
}

const props = defineProps<{
    image: ImageType
}>()
</script>

<style scoped>
    /* .photocard{
        width: 18rem;
    } */
</style>