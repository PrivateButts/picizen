<template>
    <div class="d-flex">
        <input class="form-control flex-grow" type="text" list="shareAutocomplete" v-model="shareInput" />
        <datalist id="shareAutocomplete">
            <option v-if="autocompleteQuery" v-for="u in autocompleteQuery.shareAutocomplete" :value="u.username"/>
        </datalist>
        <button class="btn btn-primary" @click="share">Share</button>
    </div>
    <ul>
        <li v-if="object.accessDict && object.accessDict.persons" v-for="user in object.accessDict.persons">{{ user }}</li>
    </ul>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Photo } from '../gql/graphql';
import { useQuery } from '@vue/apollo-composable';
import { graphql } from '../gql';


const props = defineProps<{
    object: Photo;
}>();

const shareInput = ref('');

function share(){
    console.debug("share", shareInput.value)
}

const { result: autocompleteQuery } = useQuery(graphql(`
    query shareAutoCompleteQuery($input: String!) {
        shareAutocomplete(input: $input) {
            id
            username
        }
    }
`), () => ({
    input: shareInput.value
}), { debounce: 500 })

</script>
