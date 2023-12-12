export default defineNuxtRouteMiddleware(() => {
  const userStore = useUserStore();
  if (userStore.user === null) return navigateTo("/");
});
