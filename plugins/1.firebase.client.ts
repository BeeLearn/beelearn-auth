import { getAuth, onAuthStateChanged } from "firebase/auth";

import Api from "~/lib/api";

export default defineNuxtPlugin(() => {
  const auth = getAuth();
  const userStore = useUserStore();

  onAuthStateChanged(auth, async (firebaseUser) => {
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
        return navigateTo("/sign-up/quiz/");
    } else {
      userStore.loading = false;
    }
  });
});
