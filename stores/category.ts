import Api from "~/lib/api";
import type { Category } from "~/lib/api/models/category.model";

type CategoryState = {
  next: string | null;
  previous: string | null;
  categories: Category[] | null;
  loading: "idle" | "pending" | "success" | "failed";
};

export const useCategoryStore = defineStore("category", {
  state: () =>
    ({
      next: null,
      previous: null,
      categories: null,
      loading: "idle",
    } as CategoryState),
  actions: {
    async fetchCategories() {
      this.loading = "pending";
      const { data } = await Api.instance.categoryProvider.list();

      this.next = data.next;
      this.previous = data.previous;
      this.loading = "success";

      this.categories = data.results;
    },
    async fetchNextCategories(url: string) {
      const { data } = await Api.instance.categoryProvider.list({
        url,
      });

      this.next = data.next;
      this.previous = data.previous;

      this.categories = this.categories!.concat(data.results);
    },
  },
  getters: {
    isLoading: (state) => ["idle", "pending"].includes(state.loading),
  },
});
