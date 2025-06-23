<template>
    <div class="p-4">
        <Breadcrumb :crumbs="breadcrumbs" />
        <button @click="logout" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">🚪 ออกจากระบบ</button>

        <h1 class="text-xl font-bold mb-4">📚 รายการหนังสือ</h1>
        <NuxtLink to="/book-management/create" class="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">
            ➕ เพิ่มหนังสือ
        </NuxtLink>

        <div v-for="book in books" :key="book.id" class="border p-4 mb-2 rounded">
            <div class="font-semibold">{{ book.title }}</div>
            <div>ผู้เขียน: {{ book.author }}</div>
            <div>ปีที่ตีพิมพ์: {{ book.published_year }}</div>
            <div>ประเภทหนังสือ: {{ book.genre }}</div>
            <NuxtLink :to="`/book-management/${book.id}`" class="text-blue-600 mr-2">✏️ แก้ไข</NuxtLink>
            <button @click="confirmDelete(book.id)" class="text-red-600">🗑️ ลบ</button>
        </div>

        <!-- จุดสังเกตว่าถึงท้ายรายการแล้ว -->
        <div ref="loadMoreTrigger" class="h-10"></div>

        <div v-if="isLoading" class="text-center my-4">กำลังโหลด...</div>
        <div v-if="!hasMore && !isLoading" class="text-center my-4 text-gray-500">ไม่มีข้อมูลเพิ่มแล้ว</div>

        <!-- Popup ยืนยัน -->
        <div v-if="showConfirm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white p-6 rounded shadow-md w-80 text-center">
                <h2 class="text-lg font-semibold mb-4">คุณแน่ใจหรือไม่ที่จะลบหนังสือ?</h2>
                <div class="flex justify-center gap-4">
                    <button @click="handleDelete" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                        ลบ
                    </button>
                    <button @click="showConfirm = false" class="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
                        ยกเลิก
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

const breadcrumbs = [{ label: "หน้าแรก", to: "/" }, { label: "หนังสือ" }];
const { getBooks, deleteBook } = useBookApi();
const router = useRouter();
const token = useCookie("access_token");

const books = ref([]);
const page = ref(1);
const hasMore = ref(true);
const isLoading = ref(false);

const fetchBooks = async () => {
    if (isLoading.value || !hasMore.value) return;
    isLoading.value = true;

    try {
        const result = await getBooks(page.value); // getBooks(page) ควรรองรับ pagination
        const { items } = result;
        if (items.length === 0) {
            hasMore.value = false;
        } else {
            books.value.push(...items);
            page.value++;
        }
    } catch (error) {
        console.error("Error loading books:", error);
    } finally {
        isLoading.value = false;
    }
};

// เรียกโหลดข้อมูลหน้าแรกตอน mount
onMounted(() => {
    fetchBooks();
    observeScroll();
});

// สำหรับ IntersectionObserver สังเกต element ตัวโหลดข้อมูลเพิ่มเติม
const loadMoreTrigger = ref(null);

const observeScroll = () => {
    const observer = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting) {
                fetchBooks();
            }
        },
        { threshold: 1 }
    );
    if (loadMoreTrigger.value) {
        observer.observe(loadMoreTrigger.value);
    }
};

// ลบหนังสือ
const showConfirm = ref(false);
const bookToDelete = ref(null);

const confirmDelete = (id) => {
    bookToDelete.value = id;
    showConfirm.value = true;
};

const handleDelete = async () => {
    if (!bookToDelete.value) return;
    await deleteBook(bookToDelete.value);
    showConfirm.value = false;
    bookToDelete.value = null;

    // รีเฟรชข้อมูลใหม่ (reset pagination)
    books.value = [];
    page.value = 1;
    hasMore.value = true;
    await fetchBooks();
};

// ออกจากระบบ
const logout = () => {
    token.value = null; // ลบ cookie
    router.push("/login"); // ไปหน้า login
};
</script>
