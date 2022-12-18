<template>
    <div v-if="album">
        {{ album.title }}
        {{ album.description }}
        <PhotoList :Photos="album.photos"></PhotoList>
    </div>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { computed } from 'vue';
import { graphql } from '../gql'
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


</script>