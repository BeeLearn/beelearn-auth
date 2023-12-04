export default defineNuxtPlugin((nuxtApp) => {
  const userStore = useUserStore();
  const navigate = navigateTo;

  userStore.$subscribe(function (state, data) {
  //   if (data.user) {
  //     if (
  //       !data.user.first_name ||
  //       !data.user.last_name ||
  //       data.user.categories.length === 0
  //     )
  //       navigate("/sign-up/quiz/");
  //   }
  });
});
