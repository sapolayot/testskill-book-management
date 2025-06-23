<template>
    <nav class="text-sm text-gray-600 mb-4" aria-label="Breadcrumb">
        <ol class="list-reset flex">
            <li v-for="(crumb, index) in crumbs" :key="index" class="flex items-center">
                <NuxtLink v-if="crumb.to" :to="crumb.to" class="hover:underline text-blue-600">
                    {{ crumb.label }}
                </NuxtLink>
                <span v-else>{{ crumb.label }}</span>

                <span v-if="index < crumbs.length - 1" class="mx-2">›</span>
            </li>
        </ol>
    </nav>
</template>

<script setup>
defineProps({
    crumbs: {
        type: Array,
        required: true,
    },
});
</script>
