<template>
    <div class="w-100 mt-n3">
        <img class="w-100" v-if="result && result.photo" :src="result.photo.image.url" />
    </div>
</template>

<script setup lang="ts">
import ImageType from "../types/ImageType"
import { useRoute } from "vue-router"
import gql from "graphql-tag"
import { useQuery } from "@vue/apollo-composable"


const route = useRoute()
const id = route.params.id

const { result } = useQuery(gql`
    query Photo($id: ID!) {
        photo(pk: $id) {
            id
            image {
                url
            }
        }
    }
`, {
    id
})

</script>