<template>
    <div v-if="photo" class="d-flex h-100 flex-column">
        <div class="mt-n2 flex-grow-1 d-flex flex-column justify-content-between position-relative">
            <div class="ps-3 pt-3 bg-light w-100 border-bottom border d-flex z-2">
                <div class="flex-grow-1">
                    <!-- Show edit on click, otherwise show the breadcrumb -->
                    <div v-show="editing">
                        <!-- Title Update Widget -->
                        <input ref="titleInput" type="text" class="form-control" v-model="photoTitle"
                            @change="updateTitle" @keyup.enter="updateTitle">
                    </div>
                    <div v-if="!editing" @click="editTitle">
                        <h3>
                            <Breadcrumbs :crumbs="crumbs"></Breadcrumbs>
                        </h3>
                    </div>
                </div>

                <!-- Sidebar Collapse Button -->
                <button class="btn btn-outline-info me-3 mb-3" @click="sidebarCollapsed = !sidebarCollapsed"
                    type="button" data-bs-toggle="collapse" data-bs-target="#photoSidebar" aria-expanded="false"
                    aria-controls="photoSidebar">
                    <span v-if="sidebarCollapsed"><i class="bi bi-info-circle"></i></span>
                    <span v-else><i class="bi bi-info-circle-fill"></i></span>
                </button>
            </div>
            <!-- Image holder, captures hooks for pz mouse events -->
            <div class="flex-grow-1 overflow-hidden d-flex justify-content-center w-100 position-relative"
                @wheel.prevent="scaleImage" @mousemove.prevent="offsetImage" @mousedown="() => panningImage = true"
                @mouseup="() => panningImage = false">
                <div class="position-absolute top-0 bottom-0 start-0 end-0">
                    <!-- Image -->
                    <img ref="imageElement" class="image align-self-center" :src="photo.imageUrl" :style="{
                        transform: `scale(${imageScale}) translate(${imageOffsetX}px, ${imageOffsetY}px)`,
                    }" />
                </div>
                <div class="position-absolute top-0 bottom-0 end-0">
                    <!-- Sidebar -->
                    <div id="photoSidebar" class="photo-sidebar bg-light border-start border-bottom collapse p-3 z-2">
                        <!-- Creator -->
                        <div class="mb-3" v-if="photo.creator">
                            <span class="fw-bold d-block">Creator</span>
                            <span class="">{{ photo.creator.username }}</span>
                        </div>

                        <!-- Date Taken -->
                        <div class="mb-3" v-if="photo.dateTaken">
                            <span class="fw-bold d-block">Date Taken</span>
                            <span class="">{{ new Date(photo.dateTaken).toLocaleString() }}</span>
                        </div>

                        <!-- GPS Location -->
                        <div class="mb-3" v-if="photo.gpsLat && photo.gpsLon">
                            <span class="fw-bold d-block">Location</span>
                            <span class="">
                                <a :href="`https://www.google.com/maps/place/${photo.gpsLat},${photo.gpsLon}`"
                                    target="_blank">
                                    {{ `${photo.gpsLat}, ${photo.gpsLon}` }}
                                </a>
                            </span>
                        </div>

                        <!-- Camera make model -->
                        <div class="mb-3" v-if="photo.cameraMake">
                            <span class="fw-bold d-block">Camera Make</span>
                            <span class="">{{ photo.cameraMake }}</span>
                        </div>
                        <div class="mb-3" v-if="photo.cameraModel">
                            <span class="fw-bold d-block">Camera Model</span>
                            <span class="">{{ photo.cameraModel }}</span>
                        </div>

                        <!-- Lens make model -->
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

            <!-- Previous Image Button -->
            <div class="position-absolute top-0 bottom-0 start-0 d-flex justify-content-center z-1 bg-white"
                style="--bs-bg-opacity: .2;">
                <button class="btn" @click="$router.push(previousPage as RouteLocationRaw)"
                    :disabled="previousPage == null"><i class="bi bi-chevron-left"></i></button>
            </div>

            <!-- Next Image Button -->
            <div class="position-absolute top-0 bottom-0 end-0 d-flex justify-content-center z-1 bg-white"
                style="--bs-bg-opacity: .2;">
                <button class="btn" @click="$router.push(nextPage as RouteLocationRaw)" :disabled="nextPage == null"><i
                        class="bi bi-chevron-right"></i></button>
            </div>

        </div>

        <div>
            <!-- Debug Info -->
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

.z-2 {
    z-index: 2;
}

.z-1 {
    z-index: 1;
}
</style>

<script setup lang="ts">
import { useQuery, useMutation } from '@vue/apollo-composable';
import { nextTick, ref, watch, computed, onMounted, onUnmounted } from 'vue';
import { graphql } from '../gql';
import { RouteLocationRaw, useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router';
import { PhotoQuery } from '../gql/graphql';
import Breadcrumbs from '../components/Breadcrumbs.vue';

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
    // Fetch the slide list from the history state, slide list is the photo ids in the collection this photo was in

    if (!history.state.slideList) {
        return null;
    }
    return history.state.slideList;
})

const previousPage = computed(() => {
    // Get the previous photo url in the slide list

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
    return { name: $route.name, params: { id: prev }, state: { slideList: slideList.value } }
})

const nextPage = computed(() => {
    // Get the next photo url in the slide list

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
    return { name: $route.name, params: { id: next }, state: { slideList: slideList.value } }
})


function handleNavKeys(e: KeyboardEvent) {
    // Handle keydown events for navigating between photos

    if (e.key === 'ArrowLeft') {
        $router.push(previousPage.value as RouteLocationRaw);
    } else if (e.key === 'ArrowRight') {
        $router.push(nextPage.value as RouteLocationRaw);
    }
}

onMounted(() => {
    // Add keydown event listener for navigating between photos
    window.addEventListener('keydown', handleNavKeys)
})

onUnmounted(() => {
    // Remove keydown event listener for navigating between photos
    window.removeEventListener('keydown', handleNavKeys)
})

onBeforeRouteUpdate((to, from) => {
    // Reset image zoom and offset when navigating to a new photo
    if (to.params.id !== from.params.id) {
        editing.value = false;
        imageScale.value = 1;
        imageOffsetX.value = 0;
        imageOffsetY.value = 0;
        panningImage.value = false;
    }
})


// Query for the photo
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

// Update the photo and title when the query result changes
watch(photoQuery, (result) => {
    if (result == null) {
        return;
    }
    photo.value = result.photo
    photoTitle.value = result.photo.title
})


function editTitle() {
    // Start editing the title
    if (titleInput.value == null) {
        return;
    }

    editing.value = true
    nextTick(() => {
        titleInput.value!.focus()
    })
}


// Mutation for updating the photo title
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
    // Update the photo title using the updateTitleMutation
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
    // Scale the image using the mouse wheel
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

    // Adjust image offset so that the mouse position stays in the same place, could be improved
    imageOffsetX.value = (imageOffsetX.value * newScale) / scale
    imageOffsetY.value = (imageOffsetY.value * newScale) / scale
}

function offsetImage(event: MouseEvent) {
    // Offset the image when the mouse is down
    if (!panningImage.value || imageElement.value == null) {
        return;
    }

    imageOffsetX.value += event.movementX / imageScale.value
    imageOffsetY.value += event.movementY / imageScale.value
}

const crumbs = computed(() => {
    // Generate breadcrumbs for the photo detail page
    let crumbs = []
    if ($route.name == 'AlbumPhotoDetail') {
        crumbs.push({ name: 'AlbumList', label: 'Albums' })
        crumbs.push({ name: 'AlbumDetail', params: { id: $route.params.aid }, label: 'Album' })
    } else if ($route.name == 'PhotoDetail') {
        crumbs.push({ name: 'PhotoList', label: 'Photos' })
    }
    crumbs.push({ name: $route.name, label: photo.value ? photo.value.title : "Loading...", active: true })
    return crumbs
})
</script>