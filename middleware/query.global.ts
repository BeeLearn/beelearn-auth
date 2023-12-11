export default defineNuxtRouteMiddleware((to, from) => {
  const toRedirect = to.query.redirect as string | undefined;
  const fromRedirect = from.query.redirect as string | undefined;

  if (toRedirect) return;
  if (fromRedirect && !toRedirect) {
    to.query.redirect = fromRedirect;
    return navigateTo(to);
  }
});
