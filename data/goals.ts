export type Goal = {
  icon: string;
  name: string;
  value: number;
  valueText: string;
	checked: boolean;
};

export default [
  { icon: "💪", name: "Simple", value: 5, valueText: "5 min/day", checked: false, },
  { icon: "🤟", name: "Common", value: 10, valueText: "10 min/day", checked: false, },
  { icon: "👌", name: "Serious", value: 15, valueText: "15 min/day", checked: false, },
  { icon: "💪", name: "Intensive", value: 20, valueText: "20+ min/day", checked: false, },
] as Goal[];
