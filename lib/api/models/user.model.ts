import type { Category } from "./category.model";
import type { Profile } from "./profile.model";

type Token = {
  key: string,
}

export type User = {
  id: number;
  uid: string;
  first_name: string;
  last_name: string;
  profile: Profile;
  categories: Category[];
  token: Token,
};
