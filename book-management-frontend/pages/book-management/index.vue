<template>
    <div class="p-4">
        <h1 class="text-xl font-bold mb-4">📚 รายการหนังสือ</h1>
        <NuxtLink to="/book-management/create" class="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block"
            >➕ เพิ่มหนังสือ</NuxtLink
        >

        <div v-for="book in books" :key="book.id" class="border p-4 mb-2 rounded">
            <div class="font-semibold">{{ book.title }}</div>
            <div>ผู้เขียน: {{ book.author }}</div>
            <NuxtLink :to="`/book-management/${book.id}`" class="text-blue-600 mr-2">✏️ แก้ไข</NuxtLink>
            <button @click="removeBook(book.id)" class="text-red-600">🗑️ ลบ</button>
        </div>
    </div>
</template>

<script setup>
const { getBooks, deleteBook } = useBookApi();
const books = ref([]);

const fetchBooks = async () => {
    console.log(await getBooks());
    books.value = await getBooks();
};

const removeBook = async (id) => {
    await deleteBook(id);
    await fetchBooks();
};

onMounted(fetchBooks);
</script>
