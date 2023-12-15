import axios, { type AxiosInstance } from "axios";

import UserProvider from "./providers/user.provider";
import CategoryProvider from "./providers/category.provider";

class ApiImpl {
  private axios: AxiosInstance;
  readonly userProvider: UserProvider;
  readonly categoryProvider: CategoryProvider;

  constructor(accessToken: string, public keyword: string = "Bearer") {
    const config = useRuntimeConfig();

    this.axios = axios.create({
      baseURL: config.public.apiBaseUrl,
      headers: {
        Authorization: this.keyword + " " + accessToken,
      },
    });

    this.userProvider = new UserProvider(this.axios);
    this.categoryProvider = new CategoryProvider(this.axios);
  }
}

export default class Api {
  static instance: ApiImpl;
  static firebaseInstance: ApiImpl;

  private constructor() {
  }

  static set accessToken(value: string) {
    const config = useRuntimeConfig();

    const accessToken = useCookie("accessToken", {
      domain: config.public.dashboardDomain,
      maxAge: 7 * 24 * 60 * 1000,
    });

    accessToken.value = value;
    Api.instance = new ApiImpl(value, "Token");
  }

  static set idToken(value: string) {
    Api.firebaseInstance = new ApiImpl(value);
  }
}
