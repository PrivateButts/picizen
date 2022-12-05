<template>
    <div ref="listContainer" class="photo-grid" :style="containerStyle">
            <!-- <div class="col" v-for="photo in photos">
            </div> -->
        <div
            v-for="layout in photoLayout"
            :style="layout.style"
            class="photo-grid-item"
        >
            <PhotoCard :photo="layout.photo" @click="$router.push(`/photos/${layout.photo.id}/`)">{{ layout.photo.title }}</PhotoCard>
        </div>
    </div>
</template>

<style>
.photo-grid{
    position: relative;
}

.photo-grid-item{
    position: absolute;
    display: inline-block;
}
</style>

<script setup lang="ts">import { useQuery } from '@vue/apollo-composable';
import { graphql } from '../gql';
import PhotoCard from '../components/PhotoCard.vue';
import { Photo, PhotoDateGroup } from '../gql/graphql';
import { computed, reactive } from '@vue/reactivity';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import justifiedLayout from 'justified-layout'

const listContainer = ref<HTMLElement | null>(null)

const props = defineProps<{
    PhotoDateGroup: PhotoDateGroup
}>()

const { result, loading, error } = useQuery(graphql(`
query getPhotos($yearMonth: String!) {
    photos: getPhotosByDateGroup(yearMonth: $yearMonth){
        id
        title
        image{
            url
            width
            height
        }
        blurhash
    }
}`), () => ({
    yearMonth: props.PhotoDateGroup.yearMonth
}))

const photos = computed(() => {
    return result.value?.photos as [Photo] ?? []
})

const containerWidth = ref(1000)
function updateContainerWidth() {
    if (listContainer.value == null) return
    containerWidth.value = listContainer.value.clientWidth
}

const containerResizeObserver = new ResizeObserver(updateContainerWidth)
onMounted(() => {
    containerResizeObserver.observe(listContainer.value!)
    updateContainerWidth()
//   window.addEventListener("resize", updateContainerWidth);
})
onUnmounted(() => {
    containerResizeObserver.disconnect()
//   window.removeEventListener("resize", updateContainerWidth);
})

const geometry = computed(() => {
    if(listContainer.value == null) return null

    return justifiedLayout(photos.value.map(photo => {
        return photo.image.width / photo.image.height
    }), {
        containerWidth: containerWidth.value,
    })
})

const photoLayout = computed(() => {
    if(geometry.value == null) return []

    return photos.value.map((photo, index) => {
        return {
            photo: photo,
            style: reactive({
                left: geometry.value!.boxes[index].left + "px",
                top: geometry.value!.boxes[index].top + "px",
                width: geometry.value!.boxes[index].width + "px",
                height: geometry.value!.boxes[index].height + "px"
            })
        }
    })
})

const containerStyle = computed(() => {
    return reactive({
        height: geometry.value != null ? geometry.value.containerHeight + "px" : "0px"
    })
})
</script>