<template>
    <div v-if="photo" class="">
        <div class="mt-n3">
            <div class="ps-3 pt-3 bg-light w-100 border-bottom border">
                <h1 class="">
                    <span v-if="!editing">
                        {{ photoTitle }}
                        <i @click="editTitle" class="bi bi-pencil"></i>
                    </span>
                    <input ref="input" v-if="editing" type="text" class="form-control" v-model="photoTitle" @change="updateTitle" @keyup.enter="updateTitle">
                </h1>
            </div>
            <div class="w-100">
                <img class="w-100" :src="photo.image.url" />
            </div>
        </div>


        <div>
            <button class="btn btn-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#debugInfo" aria-expanded="false" aria-controls="debugInfo">
                Show Debug Info
            </button>
            <div class="collapse" id="debugInfo">
                <a :href="`/admin/photos/photo/${photo.id}/change/`" target="_blank">Admin</a>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { graphql } from '../gql';


export default {
    data() {
        return {
            photoTitle: '',
            photo: null,
            editing: false
        }
    },
    apollo: {
        photo: {
            query: graphql(`
                query photo($id: ID!) {
                    photo(pk: $id) {
                        id
                        title
                        image {
                            url
                        }
                    }
                }
            `),
            variables() {
                return {
                    id: this.$route.params.id
                }
            },
            result({ data }) {
                this.photoTitle = data.photo.title
            }
        }
    },
    methods: {
        editTitle() {
            this.editing = true
            this.$nextTick(() => {
                this.$refs.input.focus()
            })
        },
        updateTitle() {
            this.$apollo.mutate({
                mutation: graphql(`
                    mutation updatePhoto($id: ID!, $title: String!) {
                        updatePhoto(id: $id, title: $title) {
                            id
                            title
                        }
                    }
                `),
                variables: {
                    id: this.$route.params.id as string,
                    title: this.photoTitle
                }
            }).then((result) => {
                this.photoTitle = result?.data?.updatePhoto.title
                this.editing = false
            })
        }
    }
}

</script>