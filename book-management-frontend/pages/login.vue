<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
            <h1 class="text-2xl font-bold mb-6 text-center">Login</h1>
            <form @submit.prevent="handleLogin" class="space-y-6">
                <div>
                    <label class="block mb-1 font-semibold" for="username">Username</label>
                    <input
                        id="username"
                        v-model="form.username"
                        type="text"
                        required
                        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div>
                    <label class="block mb-1 font-semibold" for="password">Password</label>
                    <input
                        id="password"
                        v-model="form.password"
                        type="password"
                        required
                        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div class="flex justify-around items-center">
                    <button
                        type="submit"
                        class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                    >
                        Login
                    </button>
                    <button
                        type="button"
                        @click="$router.push('/register')"
                        class="bg-red-400 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition"
                    >
                        Register
                    </button>
                </div>
                <p v-if="error" class="text-red-500 mt-4 text-center">{{ error }}</p>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
const form = reactive({
    username: "",
    password: "",
});
const error = ref("");
const { login } = useAuth();
const router = useRouter();
const tokenCookie = useCookie("access_token");

const handleLogin = async () => {
    error.value = "";
    const { data, error: err } = await login(form);
    if (err && err.error) {
        error.value = err.message || "Login failed";
    } else {
        tokenCookie.value = data.access_token;
        router.push("/");
    }
};
</script>
