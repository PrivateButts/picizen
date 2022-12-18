<template>
    <h1>Album List</h1>
    <router-link :to="{
        name: 'AlbumDetail', params: { id: album.id }
    }" v-for="album in albums">
        <h2>{{ album.title }}</h2>
        <p>{{ album.description }}</p>
    </router-link>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { graphql } from '../gql';

const { result: albumsQuery } = useQuery(graphql(`
    query getAlbums {
        albums{
            id
            title
            description
            photos{
                id
                title
                image{
                    width
                    height
                }
                blurhash
                imageUrl
            }
        }
    }
`))

const albums = computed(() => {
    if (albumsQuery.value == null) return [];
    return albumsQuery.value.albums;
})
</script>

<style scoped>
.read-the-docs {
    color: #888;
}
</style>
