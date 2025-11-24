import { CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/utils/helpers/format-currency";

import { getTotalMoney } from "../actions/get-total-money";

import { SummaryCard } from "./cards/summary-card";

async function TotalMoneyValue() {
  const totalMoney = await getTotalMoney();

  return (
    <CardTitle className="font-semibold @[250px]/card:text-3xl text-2xl tabular-nums">
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
