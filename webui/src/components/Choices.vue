<template>
    <select :id="id" :multiple="multiple"></select>
</template>

<script setup lang="ts">
import Choices from 'choices.js';
import "choices.js/public/assets/styles/choices.css";
import { onMounted, onUnmounted, computed, ref, nextTick } from 'vue';
import { v4 as uuidv4 } from 'uuid';

const props = defineProps<{
    multiple?: boolean;
}>();

const id = ref<string>('choices-' + uuidv4());
const widget = ref<HTMLElement>();
const choices = ref<Choices>();

const options = computed(() => {
    return {
        allowHTML: true,
        choices: [{
            value: 'Option 1',
            label: 'Option 1',
            selected: true,
            disabled: false,
        },
        {
            value: 'Option 2',
            label: 'Option 2',
            selected: false,
            disabled: false,
            customProperties: {
                description: 'Custom description about Option 2',
                random: 'Another random custom property'
            },
        }],
    }
})

onMounted(() => {
    nextTick(() => {
        const elm = document.querySelector("#" + id.value) as HTMLElement;
        console.log('creating choices');
        choices.value = new Choices(elm, options.value);
        console.log(choices.value)
    })

})
onUnmounted(() => {
    if (!choices.value) return;
    console.log('destroying choices');
    choices.value.destroy();
})
</script>