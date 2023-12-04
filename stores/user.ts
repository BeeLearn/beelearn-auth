import Api from "~/lib/api";
import type { User } from "~/lib/api/models/user.model";

type UserStore = {
  firebaseUser: {
    uid: string;
    email: string;
    displayName: string;
  } | null;
  user: User | null;
  loading: boolean,
};

export const useUserStore = defineStore("user", {
  state: () =>
    ({
      user: null,
      loading: true,
      firebaseUser: null,
    } as UserStore),
  actions: {
    async fetchUser() {
      const { data } = await Api.firebaseInstance.userProvider.getCurrentUser();
      this.user = data;

      return data;
    },
    async updateUser(body: Record<string, any>){
      const { data } = await Api.firebaseInstance.userProvider.updateCurrentUser({ data: body });

      this.user = data;
      return data;
    }
  },
});
