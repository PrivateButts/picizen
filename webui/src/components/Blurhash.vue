<template>
    <div>
        <div class="position-relative w-100 h-100" :style="`padding-bottom: ${aspectRatio * 100}%`">
            <canvas ref="canvas" class="position-absolute top-0 start-0 end-0 bottom-0 w-100 h-100" width="32" height="32" />
        </div>
    </div>
</template>

<style scope>
    .h-0 {
        height: 0px;
    }
</style>
  
<script lang="ts">
import { decode } from 'blurhash'

export default {
    props: {
        hash: {
            type: String,
            required: true
        },

        aspectRatio: {
            type: Number,
            default: 1
        }
    },

    mounted() {
        const pixels = decode(this.hash, 32, 32)
        const imageData = new ImageData(pixels, 32, 32)
        const context = this.$refs.canvas.getContext('2d')
        context.putImageData(imageData, 0, 0)
    }
}
</script>