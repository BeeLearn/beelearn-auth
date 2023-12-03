export type Gender = {
  icon: string;
  name: string;
  checked: boolean;
};

export default [
  { icon: "🧑", name: 'Male', checked: false },
  { icon: "👩", name: 'Female', checked: false },
  { icon: "👨", name: 'Other', checked: false },
] as Gender[];
