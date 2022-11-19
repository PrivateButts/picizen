<template>
    <div class="container">
        <div class="row row-cols-2 row-cols-md-4 g-2">
            <div class="col" v-for="photo in photos">
                <PhotoCard :image="photo" @click="$router.push(`/photos/${photo.id}/`)">{{ photo.title }}</PhotoCard>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { computed } from '@vue/reactivity';
import PhotoCard from '../components/PhotoCard.vue';

const { result, loading, error } = useQuery(gql`
    query {
        photos {
            id
            title
            blurhash
            image {
                url
                width
                height
            }
        }
    }
`)
let photos = computed(() => {
    let gqlPhotos = result.value?.photos ?? []
    return gqlPhotos.map(p => {
        return {
            id: p.id,
            title: p.title,
            url: p.image.url,
            blurhash: p.blurhash,
            width: p.image.width,
            height: p.image.height,
        }
    })
})
</script>

<style scoped>

</style>
