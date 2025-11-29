import { CardTitle } from "@/components/ui/card";
import { getTotalMoney } from "@/features/dashboard/actions/get-total-money";
import { SummaryCard } from "@/features/dashboard/components/cards/summary-card";
import { formatCurrency } from "@/shared/helpers/format-currency";

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
