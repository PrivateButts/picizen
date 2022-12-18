<template>
    <div v-if="photo" class="d-flex h-100 flex-column">
        <div class="mt-n2 flex-grow-1 d-flex flex-column justify-content-between">
            <div class="ps-3 pt-3 bg-light w-100 border-bottom border d-flex">
                <div class="flex-grow-1">
                    <div v-show="editing">
                        <input ref="titleInput" type="text" class="form-control" v-model="photoTitle"
                            @change="updateTitle" @keyup.enter="updateTitle">
                    </div>
                    <div v-if="!editing" @click="editTitle">
                        <h3 class="">
                            {{ photoTitle }}
                        </h3>
                    </div>
                </div>
                <button class="btn btn-outline-info me-3 mb-3" @click="sidebarCollapsed = !sidebarCollapsed"
                    type="button" data-bs-toggle="collapse" data-bs-target="#photoSidebar" aria-expanded="false"
                    aria-controls="photoSidebar">
                    <span v-if="sidebarCollapsed"><i class="bi bi-info-circle"></i></span>
                    <span v-else><i class="bi bi-info-circle-fill"></i></span>
                </button>
            </div>
            <div class="flex-grow-1 overflow-hidden d-flex justify-content-center w-100 position-relative"
                @wheel.prevent="scaleImage" @mousemove.prevent="offsetImage" @mousedown="() => panningImage = true"
                @mouseup="() => panningImage = false">
                <div class="position-absolute top-0 bottom-0 start-0 end-0">
                    <img ref="imageElement" class="image align-self-center" :src="photo.imageUrl" :style="{
                        transform: `scale(${imageScale}) translate(${imageOffsetX}px, ${imageOffsetY}px)`,
                    }" />
                </div>
                <div class="position-absolute top-0 bottom-0 end-0">
                    <div id="photoSidebar" class="photo-sidebar bg-light border-start border-bottom collapse p-3">
                        <div class="mb-3" v-if="photo.creator">
                            <span class="fw-bold d-block">Creator</span>
                            <span class="">{{ photo.creator.username }}</span>
                        </div>
                        <div class="mb-3" v-if="photo.dateTaken">
                            <span class="fw-bold d-block">Date Taken</span>
                            <span class="">{{ new Date(photo.dateTaken).toLocaleString() }}</span>
                        </div>

                        <div class="mb-3" v-if="photo.gpsLat && photo.gpsLon">
                            <span class="fw-bold d-block">Location</span>
                            <span class="">
                                <a :href="`https://www.google.com/maps/place/${photo.gpsLat},${photo.gpsLon}`"
                                    target="_blank">
                                    {{ `${photo.gpsLat}, ${photo.gpsLon}` }}
                                </a>
                            </span>
                        </div>

                        <div class="mb-3" v-if="photo.cameraMake">
                            <span class="fw-bold d-block">Camera Make</span>
                            <span class="">{{ photo.cameraMake }}</span>
                        </div>
                        <div class="mb-3" v-if="photo.cameraModel">
                            <span class="fw-bold d-block">Camera Model</span>
                            <span class="">{{ photo.cameraModel }}</span>
                        </div>

                        <div class="mb-3" v-if="photo.lensMake">
                            <span class="fw-bold d-block">Lens Make</span>
                            <span class="">{{ photo.lensMake }}</span>
                        </div>
                        <div class="mb-3" v-if="photo.lensModel">
                            <span class="fw-bold d-block">Lens Model</span>
                            <span class="">{{ photo.lensModel }}</span>
                        </div>

                    </div>
                </div>
            </div>
            <button @click="$router.push(previousPage as RouteLocationRaw)"
                :disabled="previousPage == null">Previous</button>
            <button @click="$router.push(nextPage as RouteLocationRaw)" :disabled="nextPage == null">Next</button>

        </div>

        <div>
            <button class="btn btn-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#debugInfo"
                aria-expanded="false" aria-controls="debugInfo">
                Show Debug Info
            </button>
            <div class="collapse" id="debugInfo">
                <a :href="`/admin/photos/photo/${photo.id}/change/`" target="_blank">Admin</a>
            </div>
        </div>
    </div>
</template>

<style scoped>
.image {
    transition-property: transform;
    transition-duration: 0.1s;
    object-fit: contain;
    width: 100%;
    height: 100%;
}

.photo-sidebar {
    width: 300px;
}
</style>

<script setup lang="ts">
import { useQuery, useMutation } from '@vue/apollo-composable';
import { nextTick, ref, watch, computed, onMounted, onUnmounted } from 'vue';
import { graphql } from '../gql';
import { RouteLocationRaw, useRoute, useRouter } from 'vue-router';
import { PhotoQuery } from '../gql/graphql';

const $route = useRoute()
const $router = useRouter()

const photoTitle = ref('');
const photo = ref<PhotoQuery['photo'] | null>(null);
const editing = ref(false);
const titleInput = ref<HTMLInputElement>();
const imageElement = ref<HTMLElement>();
const imageScale = ref(1);
const imageOffsetX = ref(0);
const imageOffsetY = ref(0);
const panningImage = ref(false);
const sidebarCollapsed = ref(true);


const props = defineProps<{
    id: string;
}>();

const slideList = computed(() => {
    if (!history.state.slideList) {
        return null;
    }
    return history.state.slideList;
})

const previousPage = computed(() => {
    if (!slideList.value) {
        return null;
    }
    const index = slideList.value.indexOf(props.id);
    if (index === -1) {
        return null;
    }
    let prev;
    if (index === 0) {
        prev = slideList.value[slideList.value.length - 1];
    } else {
        prev = slideList.value[index - 1];
    }
    return { name: 'PhotoDetail', params: { id: prev }, state: { slideList: slideList.value } }
})

const nextPage = computed(() => {
    if (!slideList.value) {
        return null;
    }
    const index = slideList.value.indexOf(props.id);
    if (index === -1) {
        return null;
    }
    let next;
    if (index === slideList.value.length - 1) {
        next = slideList.value[0];
    } else {
        next = slideList.value[index + 1];
    }
    return { name: 'PhotoDetail', params: { id: next }, state: { slideList: slideList.value } }
})


function handleNavKeys(e) {
    if (e.key === 'ArrowLeft') {
        $router.push(previousPage.value as RouteLocationRaw);
    } else if (e.key === 'ArrowRight') {
        $router.push(nextPage.value as RouteLocationRaw);
    }
}

onMounted(() => {
    window.addEventListener('keydown', handleNavKeys)
})

onUnmounted(() => {
    window.removeEventListener('keydown', handleNavKeys)
})



const { result: photoQuery } = useQuery(graphql(`
    query photo($id: ID!) {
        photo(pk: $id) {
            id
            title
            image {
                width
                height
            }
            imageUrl

            creator {
                username
            }
            dateTaken
            gpsLat
            gpsLon
            cameraMake
            cameraModel
            lensMake
            lensModel
        }
    }
`), () => ({
    id: `${$route.params.id}`
}))

watch(photoQuery, (result) => {
    if (result == null) {
        return;
    }
    photo.value = result.photo
    photoTitle.value = result.photo.title
})


function editTitle() {
    if (titleInput.value == null) {
        return;
    }

    editing.value = true
    nextTick(() => {
        titleInput.value!.focus()
    })
}


const { mutate: updateTitleMutation } = useMutation(
    graphql(`
        mutation updatePhoto($id: ID!, $title: String!) {
            updatePhoto(id: $id, title: $title) {
                id
                title
            }
        }
    `),
)

function updateTitle() {
    updateTitleMutation({
        id: $route.params.id as string,
        title: photoTitle.value
    }).then((result) => {
        if (result == null || result.data == null) {
            return;
        }
        photoTitle.value = result.data.updatePhoto.title
        editing.value = false
    })
}

function scaleImage(event: WheelEvent) {
    if (imageElement.value == null) {
        return;
    }

    const scale = imageScale.value
    const newScale = scale + event.deltaY * -0.01

    // Restrict scale
    if (newScale > 5) {
        return;
    }
    if (newScale < 0.1) {
        return;
    }

    imageScale.value = newScale
    imageOffsetX.value = (imageOffsetX.value * newScale) / scale
    imageOffsetY.value = (imageOffsetY.value * newScale) / scale
}

function offsetImage(event: MouseEvent) {
    if (!panningImage.value || imageElement.value == null) {
        return;
    }

    imageOffsetX.value += event.movementX / imageScale.value
    imageOffsetY.value += event.movementY / imageScale.value
}
</script>