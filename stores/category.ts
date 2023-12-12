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
    async fetchCategories(url?: string) {
      this.loading = "pending";
      console.log(Api.instance)
      const { data } = await Api.instance.categoryProvider.list({
        url,
      });

      this.next = data.next;
      this.previous = data.previous;
      this.loading = "success";

			console.log(data)

      if (url) this.categories = this.categories!.concat(data.results);
      else this.categories = data.results;
    },
  },
  getters: {
    isLoading: (state) => ["idle", "pending"].includes(state.loading),
  },
});
