export const useAuth = () => {
    const api = useNuxtApp().$api;

    const login = async (data: { username: string; password: string }) => {
        try {
            const response = await api.post("/auth/login", data);
            return { data: response.data, error: null };
        } catch (error: any) {
            return { data: null, error: error.response?.data || error.message };
        }
    };

    const register = async (data: { username: string; email: string; password: string }) => {
        try {
            const response = await api.post("/auth/register", data);
            return { data: response.data, error: null };
        } catch (error: any) {
            return { data: null, error: error.response?.data || error.message };
        }
    };

    return { login, register };
};
