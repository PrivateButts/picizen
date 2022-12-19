<template>
    <div class="container">
        <h1>Album List</h1>
        <div class="row">
            <div v-for="album in albums" class="col">
                <AlbumCard :album="album" @click="$router.push({
                    name: 'AlbumDetail', params: { id: album.id }
                })" style="cursor:pointer">{{ album.title }}</AlbumCard>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { graphql } from '../gql';
import AlbumCard from '../components/AlbumCard.vue';

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
