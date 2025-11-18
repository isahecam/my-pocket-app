import { CreateIncome } from "../schemas/income.schema";

export type ForeignCurrency = "MXN" | "USD";

export type ActionResult = {
  data?: CreateIncome;
  success?: boolean;
  message?: string;
  validationErrors?: Record<string, string[]> | null;
  operationError?: OperationError | null; // This is for the operation errors, like the database errors, etc.
};

export type OperationError = {
  code: string;
  details: string | null;
  hint: string | null;
  message: string;
};
