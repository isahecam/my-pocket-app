import { TotalIncomesCard } from "@/features/dashboard/components/total-incomes-card";
import { TotalMoneyCard } from "@/features/dashboard/components/total-money-card";

export function FinancialSummarySection() {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <TotalIncomesCard />
      <TotalMoneyCard />
    </section>
  );
}
