<template>
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li v-for="crumb in props.crumbs" class="breadcrumb-item" :class="{ active: crumb.active }"
                :aria-current="crumb.active ? 'page' : undefined">
                <router-link v-if="!crumb.active" :to="crumb">{{ crumb.label }}</router-link>
                <span v-else>{{ crumb.label }}</span>
            </li>
        </ol>
    </nav>
</template>

<script setup lang="ts">
const props = defineProps<{
    crumbs: {
        name: string,
        label: string,
        params?: Record<string, string>
        active?: boolean
    }[]
}>();
</script>