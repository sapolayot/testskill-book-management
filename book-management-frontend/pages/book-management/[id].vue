<template>
    <div class="p-4">
        <Breadcrumb :crumbs="breadcrumbs" />
        <h1 class="text-xl font-bold mb-4">✏️ แก้ไขหนังสือ</h1>
        <form @submit.prevent="submit">
            <input v-model="title" placeholder="ชื่อหนังสือ" class="border p-2 mb-2 w-full" />
            <input v-model="author" placeholder="ผู้เขียน" class="border p-2 mb-2 w-full" />
            <input v-model="published_year" placeholder="ปีที่ตีพิมพ์" class="border p-2 mb-2 w-full" />
            <input v-model="genre" placeholder="ประเภทหนังสือ" class="border p-2 mb-2 w-full" />
            <button type="submit" class="bg-yellow-500 text-white px-4 py-2 rounded">อัปเดต</button>
        </form>
    </div>
</template>

<script setup>
const breadcrumbs = [
    { label: "หน้าแรก", to: "/" },
    { label: "หนังสือ", to: "/book-management" },
    { label: "แก้ไขหนังสือ" },
];
const route = useRoute();
const router = useRouter();
const { getBook, updateBook } = useBookApi();

const title = ref("");
const author = ref("");
const published_year = ref("");
const genre = ref("");

const fetchBook = async () => {
    const book = await getBook(route.params.id);
    title.value = book.title;
    author.value = book.author;
    published_year.value = book.published_year;
    genre.value = book.genre;
};

const submit = async () => {
    await updateBook(route.params.id, {
        title: title.value,
        author: author.value,
        published_year: parseInt(published_year.value),
        genre: genre.value,
    });
    router.push("/book-management");
};

onMounted(fetchBook);
</script>
