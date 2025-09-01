export const categoryTypes = [
  "Food",
  "Education",
  "Entertainment",
  "Shopping",
  "Transportation",
  "Other",
] as const;

export const colorsBasedOnCategory = {
  Food: "red",
  Education: "blue",
  Entertainment: "green",
  Shopping: "pink",
  Transportation: "purple",
  Other: "grey",
};

export const categoryColorMap: Record<string, string> = {
  Food: "bg-red-50 text-red-700 border-red-200",
  Education: "bg-blue-50 text-blue-700 border-blue-200",
  Entertainment: "bg-green-50 text-green-700 border-green-200",
  Shopping: "bg-pink-50 text-pink-700 border-pink-200",
  Transportation: "bg-purple-50 text-purple-700 border-purple-200",
  Other: "bg-gray-50 text-gray-700 border-gray-200",
};

export const EXPENSE_LIST_KEY = "expenses";
