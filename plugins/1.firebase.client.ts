import { getAuth, onAuthStateChanged } from "firebase/auth";

import Api from "~/lib/api";

export default defineNuxtPlugin(() => {
  const auth = getAuth();
  const userStore = useUserStore();

  onAuthStateChanged(auth, async (firebaseUser) => {
    try {
    if (firebaseUser) {
      Api.accessToken = await firebaseUser.getIdToken();
      const user = await userStore.fetchUser();

      /// switch to auth token from backend
      Api.accessToken = [user.token.key, "Token"];

      if (
        !user.first_name ||
        user.last_name ||
        user.categories.length === 0
      )
        return navigateTo("/sign-up/quiz/");
    }
  }catch(e){
    console.log(e)
  }
  });
});
