import type { Category } from "./category.model";
import type { Profile } from "./profile.model";

type Token = {
  key: string;
};

const Gender = {
  MALE: "Male",
  OTHER: "Other",
  FEMALE: "Female",
};

export type User = {
  id: number;
  uid: string;
  username: string;
  first_name: string;
  last_name: string;
  profile: Profile;
  categories: Category[];
  token: Token;
  gender: keyof typeof Gender;
};
