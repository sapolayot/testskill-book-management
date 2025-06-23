export const useBookApi = () => {
    const api = useNuxtApp().$api;

    const getBooks = () => api.get("/books").then((res) => res.data);
    const getBook = (id: string) => api.get(`/books/${id}`).then((res) => res.data);
    const addBook = (data: any) => api.post("/books", data).then((res) => res.data);
    const updateBook = (id: string, data: any) => api.patch(`/books/${id}`, data).then((res) => res.data);
    const deleteBook = (id: string) => api.delete(`/books/${id}`).then((res) => res.data);

    return { getBooks, getBook, addBook, updateBook, deleteBook };
};
