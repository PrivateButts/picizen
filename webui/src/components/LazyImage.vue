<template>
    <div ref="wrapper" v-bind="$attrs">
        <div class="relative w-100 h-100">
            <!-- Show the placeholder as background -->
            <blurhash-img :hash="hash" :aspect-ratio="height / width" v-if="hash"
                class="position-absolute top-0 transition-opacity duration-500 w-100 h-100"
                :class="isLoaded ? 'opacity-0' : 'opacity-100'" />

            <!-- Show the real image on the top and fade in after loading -->
            <img ref="image" :width="width" :height="height" :alt="imgAlt"
                class="position-absolute top-0 transition-opacity duration-500 w-100 h-100 rounded"
                :class="isLoaded ? 'opacity-100' : 'opacity-0'">
        </div>
    </div>
</template>

<style scoped>
    .transition-opacity {
        transition-property: opacity;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 150ms;
    }

    .duration-500 {
        transition-duration: 500ms;
    }
</style>
  
<script lang="ts">
import BlurhashImg from "./Blurhash.vue";

export default {
    components: {
        BlurhashImg
    },

    inheritAttrs: false,

    props: {
        src: {
            type: String,
            required: true
        },
        hash: {
            type: String,
            required: false,
            default: null
        },
        width: {
            type: Number,
            default: 1
        },
        height: {
            type: Number,
            default: 1
        },
        imgAlt: {
            type: String,
            default: ""
        }
    },

    data() {
        return {
            isLoaded: false
        };
    },

    mounted() {
        this.observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                this.onEnter()
            }
        })

        this.observer.observe(this.$refs.wrapper)
    },

    unmounted() {
        this.observer.disconnect()
    },

    methods: {
        onEnter() {
            // Image is visible (means: has entered the viewport),
            // so start loading by setting the src attribute
            this.$refs.image.src = this.src;

            this.$refs.image.onload = () => {
                // Image is loaded, so start fading in
                this.isLoaded = true;
                // For debugging
                // setTimeout(() => {
                //     this.isLoaded = true;
                // }, 3000);
            };
        }
    }
};
</script>