import type { Paginate } from "../models/_paginate.model";
import type { Category } from "../models/category.model";
import { ApiProviderImpl, type TApiOption } from "./api.provider";

export default class CategoryProvider extends ApiProviderImpl {
  protected apiPath: string = "/api/metadata/categories/";

  list(options?: Pick<TApiOption, "url" | "query">) {
    return this.get<Paginate<Category>>(options);
  }
}
