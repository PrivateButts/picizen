<template>
    <div v-if="objectQuery">
        <div>
            <input class="form-control flex-grow" type="text" v-model="shareInput" @input="fetchAutocomplete()"/>
            <ul v-if="autocompleteQuery" class="list-group">
                <li v-for="u in autocompleteQuery.shareAutocomplete" class="list-group-item align-content-center justify-content-between d-flex">
                    <div>{{ u.username }}</div>
                    <button class="btn btn-success" @click="queueShare(u)" :disabled="isInShareList(u.id)">Add</button>
                </li>
            </ul>
        </div>

        <div v-if="shareList.length > 0">
            <p>To share:</p>
            <ul class="list-group">
                <li v-for="s in shareList" class="list-group-item align-content-center justify-content-between d-flex">
                    <div>{{ s.username }}</div>
                    <button class="btn btn-danger" @click="unqueueShare(s)">Remove</button>
                </li>
            </ul>
            <button class="btn btn-primary w-100" @click="share">Share</button>
        </div>
        <div v-if="objectQuery.shareRules.length > 0" class="mt-3">
            <p>Shared with:</p>
            <ul class="list-group">
                <li class="list-group-item align-content-center justify-content-between d-flex" v-if="persons?.length > 0" v-for="user in persons">
                    <div>{{ user.target.username }}</div>
                    <button class="btn btn-danger" @click="unshare(user)">Remove</button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { User, Access, ShareableObjects } from '../gql/graphql';
import { useLazyQuery, useMutation, useQuery } from '@vue/apollo-composable';
import { graphql } from '../gql';
import { watchDebounced } from '@vueuse/core'



const props = defineProps<{
    object_type: ShareableObjects;
    object_id: string;
}>();

const shareInput = ref('');
const shareList = ref<User[]>([]);

async function queueShare(user: User){
    shareList.value.push(user)
}

async function unqueueShare(user: User){
    shareList.value = shareList.value.filter(u => u.id !== user.id)
}

function isInShareList(id: string){
    return shareList.value.some(u => u.id === id)
}

async function share(){
    console.debug("share", shareInput.value)
    const result = await shareMutation({
        id: props.object_id,
        persons: shareList.value.map((u: User) => u.id)
    })

    // TODO: handle errors
    shareList.value = []

    refetchObject()
}

async function unshare(rule: Access){
    const result = await revokeMutation({
        id: rule.id
    })
    refetchObject()
}


const persons = computed(() => {
    return objectQuery.value?.shareRules.filter((r: any) => r.target.__typename === 'User')
})

const { result: objectQuery, refetch: refetchObject } = useQuery(graphql(`
    query shareObjectQuery($object_type: ShareableObjects!, $object_id: ID!) {
        shareRules(objectType: $object_type, objectId: $object_id) {
            id
            target {
            ... on User{ username }
            ... on Group{ name }
            ... on Token{ token }
            ... on PublicRule{ public }
            }
        }
    }
`), () => ({
    object_type: props.object_type,
    object_id: props.object_id
}))

const { result: autocompleteQuery, load: startAutocomplete, refetch: refetchAutocomplete } = useLazyQuery(graphql(`
    query shareAutoCompleteQuery($input: String!) {
        shareAutocomplete(input: $input) {
            id
            username
        }
    }
`), () => ({
    input: shareInput.value
}))

watchDebounced(
    shareInput,
    () => { startAutocomplete() || refetchAutocomplete() },
    { debounce: 1000, maxWait: 3000 },
)


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

const { mutate: revokeMutation } = useMutation(
    graphql(`
        mutation revokeMutation($id: ID!) {
            revokeRule(id: $id)
        }
    `)
)

</script>
