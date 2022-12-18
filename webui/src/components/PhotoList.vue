<template>
    <div ref="listContainer" class="photo-grid">
        <!-- <div class="col" v-for="photo in photos">
            </div> -->
        <div v-for="layout in photoLayout" :style="layout.style" class="photo-grid-item">
            <PhotoCard :photo="layout.photo"
                @click="$router.push({ name: 'PhotoDetail', params: { id: layout.photo.id }, state: { slideList: photoIds } })">
                {{
        layout.photo.title
                }}</PhotoCard>
        </div>
    </div>
</template>

<style>
.photo-grid {
    --min-width: 33%;
    --row-height: 20vh;
    --max-row-height: 50vh;
    display: flex;
    flex-wrap: wrap;
    margin: 0.25rem;
}

.photo-grid-item {
    --ratio: calc(var(--w) / var(--h));
    flex-grow: calc(var(--ratio) * 100);
    flex-basis: calc(var(--ratio) * var(--row-height));
    margin: 0.25rem;
    min-width: var(--min-width);
}

.photo-grid-item>div {
    display: block;
    width: 100%;
    height: auto;
    min-width: 100%;
    min-height: 100%;
    /* max-height: var(--max-row-height); */
    /* object-fit: cover; */
}

.photo-grid-item>div>div>div>img {
    object-fit: cover;
}
</style>

<script setup lang="ts">
import PhotoCard from '../components/PhotoCard.vue';
import { Photo } from '../gql/graphql';
import { computed, reactive } from '@vue/reactivity';
import { onMounted, onUnmounted, ref, watch } from 'vue';

const listContainer = ref<HTMLElement | null>(null)

const props = defineProps<{
    Photos: Photo[]
}>()

const photos = computed(() => {
    return props.Photos as Photo[] ?? []
})

const photoIds = computed(() => {
    return photos.value.map((photo: Photo): string => photo.id) as [string] ?? []
})

const photoLayout = computed(() => {
    return photos.value.map((photo, index) => {
        return {
            photo: photo,
            style: reactive({ "--w": photo.image.width, "--h": photo.image.height })
        }
    })
})
</script>