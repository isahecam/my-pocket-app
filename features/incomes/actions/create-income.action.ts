"use server";

import { updateTag } from "next/cache";
import z from "zod";
import {
  type CreateIncome,
  createIncomeSchema,
} from "@/features/incomes/schemas/income.schema";
import type { ActionResult } from "@/features/incomes/types/income.types";
import { createClient } from "@/utils/supabase/server";

export async function createIncomeAction(
  input: CreateIncome
): Promise<ActionResult> {
  const validatedFields = createIncomeSchema.safeParse(input);

  // * If the fields are not valid, return the validation errors
  if (!validatedFields.success) {
    const flattenedErrors = z.flattenError(validatedFields.error);

    return {
      success: false,
      message:
        "Tu ingreso no se pudo crear, por favor revisa los campos y vuelve a intentarlo.",
      validationErrors: flattenedErrors.fieldErrors,
      data: input,
    };
  }

  // * Send the data to the Supabase database to create the income
  const supabase = await createClient();
  const { error } = await supabase.from("incomes").insert(input);

  // ! If there is an error, return the operation error
  if (error) {
    return {
      success: false,
      message: "Error al registrar tu ingreso",
    };
  }

  // * Success case

  updateTag("all-incomes");

  return {
    success: true,
    message: "Ingreso creado exitosamente",
    validationErrors: null,
    operationError: null,
    data: input,
  };
}
