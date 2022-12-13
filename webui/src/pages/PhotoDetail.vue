<template>
    <div v-if="photo" class="d-flex h-100 flex-column">
        <div class="mt-n2 flex-grow-1 d-flex flex-column justify-content-between">
            <div class="ps-3 pt-3 bg-light w-100 border-bottom border">
                <h1 class="">
                    <span v-show="editing">
                        <input ref="titleInput" type="text" class="form-control" v-model="photoTitle"
                            @change="updateTitle" @keyup.enter="updateTitle">
                    </span>
                    <span v-if="!editing">
                        {{ photoTitle }}
                        <i @click="editTitle" class="bi bi-pencil"></i>
                    </span>
                </h1>
            </div>
            <div class="flex-grow-1 overflow-hidden d-flex justify-content-center w-100 position-relative"
                @wheel.prevent="scaleImage" @mousemove.prevent="offsetImage" @mousedown="() => panningImage = true"
                @mouseup="() => panningImage = false">
                <div class="position-absolute top-0 bottom-0 start-0 end-0">
                    <img ref="imageElement" class="image align-self-center" :src="photo.imageUrl" :style="{
                        transform: `scale(${imageScale}) translate(${imageOffsetX}px, ${imageOffsetY}px)`,
                    }" />
                </div>
            </div>
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
</style>

<script setup lang="ts">
import { useQuery, useMutation } from '@vue/apollo-composable';
import { nextTick, ref, watch, computed } from 'vue';
import { graphql } from '../gql';
import { useRoute } from 'vue-router';
import { PhotoQuery } from '../gql/graphql';

const $route = useRoute()

const photoTitle = ref('');
const photo = ref<PhotoQuery['photo'] | null>(null);
const editing = ref(false);
const titleInput = ref<HTMLInputElement>();
const imageElement = ref<HTMLElement>();
const imageScale = ref(1);
const imageOffsetX = ref(0);
const imageOffsetY = ref(0);
const panningImage = ref(false);



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