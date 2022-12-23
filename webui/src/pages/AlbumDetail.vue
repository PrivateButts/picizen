<template>
    <div v-if="album">
        <Breadcrumbs :crumbs="crumbs"></Breadcrumbs>
        {{ album.title }}
        {{ album.description }}
        <PhotoList :Photos="album.photos" :linkOverride="{ name: 'AlbumPhotoDetail', params: { aid: props.id } }">
        </PhotoList>
    </div>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { computed } from 'vue';
import { graphql } from '../gql'
import Breadcrumbs from '../components/Breadcrumbs.vue';
import PhotoList from '../components/PhotoList.vue';

const props = defineProps<{
    id: string
}>()

const { result: albumQuery } = useQuery(graphql(`
    query album($id: ID!){
        album(pk: $id){
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
`), () => ({
    id: `${props.id}`
}))

const album = computed(() => {
    if (albumQuery.value == null) return null;
    return albumQuery.value.album;
})

const crumbs = computed(() => {
    return [{
        name: 'AlbumList',
        label: 'Albums',
    }, {
        name: 'AlbumDetail',
        label: album.value?.title,
        params: {
            id: props.id
        },
        active: true
    }]
});

</script>