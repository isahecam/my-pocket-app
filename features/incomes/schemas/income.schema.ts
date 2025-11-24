import type { z } from "zod";

import { incomeSchema } from "./base.schema";

export const createIncomeSchema = incomeSchema;

export type CreateIncome = z.infer<typeof createIncomeSchema>;
