"use server";

import { cacheLife, cacheTag } from "next/cache";
import { createClient } from "@/utils/supabase/server";

export async function getAllIncomes() {
  "use cache: private";
  cacheLife("days");
  cacheTag("all-incomes");

  const supabase = await createClient();

  const { data: incomes } = await supabase.from("incomes").select();
  return incomes ?? [];
}
