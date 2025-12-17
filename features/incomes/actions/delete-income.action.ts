"use server";

import { updateTag } from "next/cache";
import type { Income } from "@/shared/domain/models/income";
import { createClient } from "@/utils/supabase/server";

export async function deleteIncomeAction(incomeId: Income["id"]) {
  const supabase = await createClient();
  const { error } = await supabase.from("incomes").delete().eq("id", incomeId);

  // ! If there is an error, return the operation error
  if (error) {
    return {
      success: false,
      message: "Error al eliminar el ingreso",
    };
  }

  // * Success case
  updateTag("all-incomes");

  return {
    success: true,
    message: "Ingreso eliminado exitosamente",
  };
}
