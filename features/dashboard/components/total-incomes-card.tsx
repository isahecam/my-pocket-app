import { CardTitle } from "@/components/ui/card";

import { getTotalIncomes } from "../actions/get-total-incomes";

import { SummaryCard } from "./cards/summary-card";

async function TotalIncomesValue() {
  const totalIncomes = await getTotalIncomes();

  return (
    <CardTitle className="font-semibold @[250px]/card:text-3xl text-2xl tabular-nums">
      {totalIncomes}
    </CardTitle>
  );
}

export function TotalIncomesCard() {
  return (
    <SummaryCard title="Número de ingresos 📈">
      <TotalIncomesValue />
    </SummaryCard>
  );
}
