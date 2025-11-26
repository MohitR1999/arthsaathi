export type Category = "EXPENSE" | "INCOME";

export type SubCategory = {
  category: Category;
  id: string;
  sub_category: string;
};

