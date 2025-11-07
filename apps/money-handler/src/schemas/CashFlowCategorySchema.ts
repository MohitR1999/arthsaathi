import * as z from 'zod';
const CashFlowCategorySchema = z.object({
    sub_category: z.string().regex(/^[a-zA-Z0-9_.-\s]+$/)
});

export { CashFlowCategorySchema };