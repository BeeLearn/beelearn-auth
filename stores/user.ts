import Api from "~/lib/api";
import type { User } from "~/lib/api/models/user.model";

type UserStore = {
  firebaseUser: {
    uid: string;
    email: string;
    displayName: string;
  } | null;
  user: User | null;
};

export const useUserStore = defineStore("user", {
  state: () =>
    ({
      user: null,
      firebaseUser: null,
    } as UserStore),
  actions: {
    async fetchUser() {
      const { data } = await Api.instance.userProvider.getCurrentUser();
      this.user = data;

      return data;
    },
  },
});
