<template>
    <div class="container mt-3">
        <input @change="queueUpload" type="file" multiple/>
        <div v-if="uploading">
            <span>{{uploadQueue.length + 1}} photos queued to upload</span>
            <div class="progress">
                <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-label="Current File Upload Progress" :aria-valuenow="currentFileProgress" aria-valuemin="0" aria-valuemax="100" :style="{width: currentFileProgress+'%'}"></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { graphql } from '../gql'
import { start } from 'repl'

export default {
    data() : {
        currentFileProgress: number,
        uploadQueue: Array<File>,
        uploading: boolean
    } {
        return {
            currentFileProgress: 0,
            uploadQueue: [],
            uploading: false
        }
    },
    methods: {
        queueUpload(e: Event) {
            const files = (e.target as HTMLInputElement).files

            if (!files || !files.length) {
                return
            }

            const startUpload = this.$data.uploadQueue.length == 0

            this.$data.uploadQueue.push(...Array.from(files))
            if(startUpload){
                this.$data.uploading = true
                this.upload(this.$data.uploadQueue.shift()!)
            }
        },
        upload(file: File){
            this.$data.currentFileProgress = 0
            this.$apollo.mutate({
                mutation: graphql(`
                    mutation uploadPhoto($title: String!, $file: Upload!){
                        uploadPhoto(title: $title, image: $file){
                            id
                        }
                    }
                `),
                variables: {
                    title: file.name,
                    file: file
                },
                context: {
                    fetchOptions: {
                        hasUpload: true,
                        onProgress: (e:ProgressEvent)=>{
                            this.$data.currentFileProgress = (e.loaded/e.total)*100
                        },
                    }
                }
            }).then((data) => {
                if(this.$data.uploadQueue.length > 0){
                    this.upload(this.$data.uploadQueue.shift()!)
                }else{
                    this.$data.uploading = false
                }
            })
        }
    }
}
</script>