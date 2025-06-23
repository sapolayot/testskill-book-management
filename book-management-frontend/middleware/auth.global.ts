export default defineNuxtRouteMiddleware((to, from) => {
    const guestOnlyPaths = ["/login", "/register"];

    const token = useCookie("access_token");
    if (!token.value && !guestOnlyPaths.includes(to.path)) {
        return navigateTo("/login");
    } else if (token.value && guestOnlyPaths.includes(to.path)) {
        return navigateTo("/book-management");
    }
});
