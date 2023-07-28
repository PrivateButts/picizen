<template>
    <div class="d-flex">
        <input class="form-control flex-grow" type="text" list="shareAutocomplete" v-model="shareInput" />
        <datalist id="shareAutocomplete">
            <option v-if="autocompleteQuery" v-for="u in autocompleteQuery.shareAutocomplete" :value="u.id">{{ u.username }}</option>
        </datalist>
        <button class="btn btn-primary" @click="addShare">Add</button>
    </div>
    <button class="btn btn-primary" @click="share">Share</button>

    <div v-if="shareList.length > 0">
        <h5>To share:</h5>
        <ul>
            <li v-for="s in shareList">{{ s }}</li>
        </ul>
    </div>

    <div v-if="object.accessByType.persons.length > 0">
        <h5>Shared with:</h5>
        <ul>
            <li v-if="object.accessByType && object.accessByType.persons" v-for="user in object.accessByType.persons">
                {{ user.target.username }}
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Photo, User, Access } from '../gql/graphql';
import { useMutation, useQuery } from '@vue/apollo-composable';
import { graphql } from '../gql';


const props = defineProps<{
    object: Photo;
}>();

const shareInput = ref('');
const shareList = ref<User[]>([]);

async function addShare(){
    shareList.value.push(shareInput.value)
    shareInput.value = ''
}

async function share(){
    console.debug("share", shareInput.value)
    const result = await shareMutation({
        id: props.object.id,
        persons: shareList.value.map((u: number) => u)
    })

    console.debug("share result", result)
    const persons = result?.data?.shareObject?.persons || []
    shareList.value = persons.map((p: any) => p.target)
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


const { mutate: shareMutation } = useMutation(
    graphql(`
        mutation shareMutation($id: ID!, $persons: [ID!]) {
            shareObject(objectType: PHOTO, id: $id, persons: $persons) {
                persons {
                    id
                    target {
                        ... on User {
                            id
                            username
                        }
                    }
                }
            }
        }
    `)
)

</script>
