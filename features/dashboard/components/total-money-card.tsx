import { CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/utils/helpers/format-currency";

import { getTotalMoney } from "../actions/get-total-money";

import { SummaryCard } from "./cards/summary-card";

async function TotalMoneyValue() {
  const totalMoney = await getTotalMoney();

  return (
    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
      {formatCurrency(totalMoney, "MXN")}
    </CardTitle>
  );
}

export function TotalMoneyCard() {
  return (
    <SummaryCard title="Mi dinero actual 💸">
      <TotalMoneyValue />
    </SummaryCard>
  );
}
