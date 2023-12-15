import { getAuth, onAuthStateChanged } from "firebase/auth";

import Api from "~/lib/api";

export default defineNuxtPlugin(() => {
  const auth = getAuth();
  const route = useRoute();
  const userStore = useUserStore();
  const config = useRuntimeConfig();

  onAuthStateChanged(auth, async (firebaseUser) => {
    userStore.loading = true;

    if (firebaseUser) {
      Api.idToken = await firebaseUser.getIdToken();
      const user = await userStore.fetchUser();

      /// switch to auth token from backend
      Api.accessToken = user.token.key;
      userStore.loading = false;

      if (
        !user.first_name ||
        !user.last_name ||
        !user.username ||
        !user.gender ||
        user.categories.length === 0
      )
        return navigateTo("/sign-up/onboarding/");
      else {
        const redirect = route.query.redirect as string;
        if (redirect) window.location.replace(redirect);
        else window.location.replace(config.public.dashboardBaseUrl);
      }
    } else {
      userStore.loading = false;
    }
  });
});
