<template>
    <div class="p-4">
        <h1 class="text-xl font-bold mb-4">➕ เพิ่มหนังสือ</h1>
        <form @submit.prevent="submit">
            <input v-model="title" placeholder="ชื่อหนังสือ" class="border p-2 mb-2 w-full" />
            <input v-model="author" placeholder="ผู้เขียน" class="border p-2 mb-2 w-full" />
            <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded">บันทึก</button>
        </form>
    </div>
</template>

<script setup>
const { addBook } = useBookApi();
const router = useRouter();

const title = ref("");
const author = ref("");

const submit = async () => {
    await addBook({ title: title.value, author: author.value });
    router.push("/books");
};
</script>
