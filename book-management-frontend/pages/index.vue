<script setup lang="ts">
import { useRouter } from "vue-router";
import { useState } from "#app";

const router = useRouter();

const token = useCookie("access_token");
if (token) {
    router.push("/book-management");
} else {
    router.push("/login");
}
</script>

<template>
    <div class="p-4 text-center">กำลังตรวจสอบสถานะ...</div>
</template>
