import * as z from "zod";
import { CATEGORY } from "@arthsaathi/helpers/categories";

const categories = [CATEGORY.EXPENSE, CATEGORY.INCOME] as const;

const CashFlowSchema = z.object({
  amount: z.number(),
  category: z.enum(categories),
  sub_category: z.string().regex(/^[a-zA-Z0-9_.-\s]+$/),
  description: z.string(),
  date: z.coerce.date(),
});

export { CashFlowSchema };
