"use server";

import z from "zod";

import { createClient } from "@/utils/supabase/server";

import { CreateIncome, createIncomeSchema } from "../schemas/income.schema";
import { ActionResult } from "../types/income.types";

export async function createIncomeAction(input: CreateIncome): Promise<ActionResult> {
  const validatedFields = createIncomeSchema.safeParse(input);

  // * If the fields are not valid, return the validation errors
  if (!validatedFields.success) {
    const flattenedErrors = z.flattenError(validatedFields.error);

    return {
      success: false,
      message: "Tu ingreso no se pudo crear, por favor revisa los campos y vuelve a intentarlo.",
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
  return {
    success: true,
    message: "Ingreso creado exitosamente",
    validationErrors: null,
    operationError: null,
    data: input,
  };
}
