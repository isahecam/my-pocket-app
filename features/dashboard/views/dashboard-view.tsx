import { FinancialSummarySection } from "@/features/dashboard/sections/financial-summary";

export function DashboardView() {
  return (
    <main className="@container/main flex flex-1 flex-col gap-2 p-6">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <FinancialSummarySection />
      </div>
    </main>
  );
}
