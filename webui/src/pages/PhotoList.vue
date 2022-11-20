<template>
    <div class="container">
        <div class="row row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-2">
            <div class="col" v-for="photo in photos">
                <PhotoCard :photo="photo" @click="$router.push(`/photos/${photo.id}/`)">{{ photo.title }}</PhotoCard>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { graphql } from '../gql'
import { computed } from '@vue/reactivity';
import PhotoCard from '../components/PhotoCard.vue';

const { result, loading, error } = useQuery(graphql(`
    query getAllPhotos{
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
`))
let photos = computed(() => {
    return result.value?.photos ?? []
})
</script>

<style scoped>

</style>
