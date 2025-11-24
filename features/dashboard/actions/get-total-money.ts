"use server";

// import { cacheLife } from "next/cache";

import { createClient } from "@/utils/supabase/server";

export async function getTotalMoney() {
  // "use cache: private";
  // cacheLife({ stale: 60 }); // Cache por 60 segundos (mínimo 30 requerido)

  const supabase = await createClient();

  const { data: incomes } = await supabase.from("incomes").select();
  const totalMoney = incomes?.reduce(
    (acc, income) => acc + Number(income.amount),
    0
  );

  return totalMoney ?? 0;
}
