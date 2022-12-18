<template>
    <div class="container">
        <div v-for="(group, i) in dateGroups">
            <hr v-if="i != 0" />
            <p>{{ group.dateLabel }}</p>
            <PhotoList :Photos="group.photos"></PhotoList>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { graphql } from '../gql'
import { computed } from '@vue/reactivity';
import { PhotoDateGroup } from '../gql/graphql';
import PhotoList from '../components/PhotoList.vue';

const { result: dateGroupsQuery } = useQuery(graphql(`
    query getDateGroups {
        photoDateGroups{
            yearMonth
            totalPhotos
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

const dateGroups = computed(() => {
    if (dateGroupsQuery.value == null) return [];
    return dateGroupsQuery.value.photoDateGroups.flatMap((group: PhotoDateGroup) => {
        // if(group.yearMonth == "Unknown") return [];
        return [{
            yearMonth: group.yearMonth,
            totalPhotos: group.totalPhotos,
            photos: group.photos,
            dateLabel: group.yearMonth == "Unknown" ? "Unknown" : new Date(group.yearMonth).toLocaleString('default', { month: 'long', year: 'numeric' })
        }]
    })

})
</script>

<style scoped>

</style>
