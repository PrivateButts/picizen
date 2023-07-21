<template>
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li v-for="crumb in props.crumbs" class="breadcrumb-item" :class="{ active: crumb.active }"
                :aria-current="crumb.active ? 'page' : undefined">
                <router-link v-if="!crumb.active" :to="crumb">{{ crumb.label }}</router-link>
                <span v-else>
                    <!-- Show edit on click, otherwise show the breadcrumb -->
                    <!-- Title Update Widget -->
                    <input v-show="editing" ref="titleInput" type="text" class="form-control inline-form-widget" v-model="titleText"
                        @change="updateTitle" @keyup.enter="updateTitle">
                    <span v-if="!editing" @click="editTitle">{{ crumb.label }}</span>
                </span>
            </li>
        </ol>
    </nav>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue';

interface Crumb {
    name: string,
    label: string,
    params?: Record<string, string>
    active?: boolean
}

interface CrumbProps {
    crumbs: Crumb[]
    canEditTitle?: boolean
    editHandler: Function
}

const props = withDefaults(defineProps<CrumbProps>(), {
    canEditTitle: false,
    editHandler: (text: string) => {}
});

const titleInput = ref<HTMLInputElement>();
const titleText = ref('');
const editing = ref(false);

function editTitle() {
    // Start editing the title
    if (titleInput.value == null || !props.canEditTitle) {
        return;
    }

    editing.value = true
    nextTick(() => {
        titleInput.value!.focus()
    })
}

async function updateTitle(){
    const title = await props.editHandler(titleText.value);
    if (title != null) {
        titleText.value = title;
        editing.value = false;
    }
}

</script>

<style scoped>
.inline-form-widget{
    display: inline-block;
    width: auto;
}
</style>
