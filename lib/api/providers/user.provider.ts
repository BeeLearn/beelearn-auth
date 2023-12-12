import type { User } from "../models/user.model";

import { ApiProviderImpl, type TApiPatchOption } from "./api.provider";

export default class UserProvider extends ApiProviderImpl {
  protected apiPath: string = "/api/account/users/";

  getCurrentUser() {
    return this.get<User>({ path: "current-user" });
  }

  updateCurrentUser({ data }: Pick<TApiPatchOption, "data">) {
    return this.patch<User>({ path: "current-user", data });
  }

  usernameExist(username: string) {
    return this.post<{ exists: boolean }>({
      path: "username-exist",
      data: { username },
    });
  }
}
