<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="max-w-md w-full bg-white rounded-lg shadow-lg p-8 relative">
            <h1 class="text-2xl font-bold mb-6 text-center">Register</h1>
            <form @submit.prevent="handleRegister" class="space-y-4">
                <div>
                    <label class="block mb-1 font-semibold">Username</label>
                    <input
                        v-model="form.username"
                        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        type="text"
                        required
                    />
                </div>
                <div>
                    <label class="block mb-1 font-semibold">Email</label>
                    <input
                        v-model="form.email"
                        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        type="email"
                        required
                    />
                </div>
                <div>
                    <label class="block mb-1 font-semibold">Password</label>
                    <input
                        v-model="form.password"
                        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        type="password"
                        required
                    />
                </div>

                <div class="flex justify-between flex-wrap gap-2 mt-4">
                    <button
                        type="submit"
                        class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                    >
                        Submit
                    </button>
                    <button
                        type="button"
                        @click="clearForm"
                        class="bg-yellow-400 text-white px-4 py-2 rounded-md hover:bg-yellow-500 transition"
                    >
                        Clear
                    </button>
                    <button
                        type="button"
                        @click="router.push('/login')"
                        class="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition"
                    >
                        Back to Login
                    </button>
                </div>

                <p v-if="error" class="text-red-500 mt-4 text-center">{{ error }}</p>
            </form>

            <!-- Toast -->
            <transition name="fade">
                <div
                    v-if="showToast"
                    class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full bg-green-500 text-white px-4 py-2 mt-4 rounded shadow-md z-50"
                >
                    สมัครสมาชิกเรียบร้อยแล้ว!
                </div>
            </transition>
        </div>
    </div>
</template>

<script setup lang="ts">
const form = reactive({
    username: "",
    email: "",
    password: "",
});
const error = ref("");
const showToast = ref(false);

const { register } = useAuth();
const router = useRouter();

const handleRegister = async () => {
    error.value = "";
    const { data, error: err } = await register(form);
    if (err && err.value) {
        error.value = err.value.message || "Register failed";
    } else {
        showToast.value = true;
        setTimeout(() => {
            showToast.value = false;
            router.push("/login");
        }, 2000);
    }
};

const clearForm = () => {
    form.username = "";
    form.email = "";
    form.password = "";
};
</script>

<style scoped>
/* Optional fade animation */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
