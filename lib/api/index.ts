import axios, { type AxiosInstance } from "axios";

import UserProvider from "./providers/user.provider";
import CategoryProvider from "./providers/category.provider";

class ApiImpl {
  private axios: AxiosInstance;
  readonly userProvider: UserProvider;
  readonly categoryProvider: CategoryProvider;

  constructor(accessToken: string, public keyword: string = "Bearer") {
    this.axios = axios.create({
      baseURL: "http://localhost:8000/",
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

  private constructor() {}

  static set accessToken(value: string | [string, string]) {
    if(typeof value === "string")
      Api.instance = new ApiImpl(value);
    else 
      Api.instance = new ApiImpl(...value);
  }
}
