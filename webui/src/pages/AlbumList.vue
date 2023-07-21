<template>
    <div class="container">
        <Breadcrumbs :crumbs="crumbs"></Breadcrumbs>
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
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
import Breadcrumbs from '../components/Breadcrumbs.vue';
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
            coverPhoto{
                imageUrl
            }
            photoCount
            createdAt
        }
    }
`))

const albums = computed(() => {
    if (albumsQuery.value == null) return [];
    return albumsQuery.value.albums;
})

const crumbs = computed(() => {
    return [{
        name: 'AlbumList',
        label: 'Albums',
        active: true
    }]
});
</script>

<style scoped>
.read-the-docs {
    color: #888;
}
</style>
