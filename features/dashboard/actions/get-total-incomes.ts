"use server";

// import { cacheLife } from "next/cache";

import { createClient } from "@/utils/supabase/server";

export async function getTotalIncomes() {
  // "use cache: private";
  // cacheLife({ stale: 60 }); // Cache por 60 segundos (mínimo 30 requerido)

  const supabase = await createClient();

  const { data: incomes } = await supabase.from("incomes").select();
  return incomes?.length ?? 0;
}
