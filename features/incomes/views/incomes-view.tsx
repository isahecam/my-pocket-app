import { Suspense } from "react";
import { DataTable } from "@/components/ui/data-table";
import { Spinner } from "@/components/ui/spinner";
import { getAllIncomes } from "@/features/incomes/actions/get-all-incomes.action";
import { DialogNewIncome } from "@/features/incomes/components/dialog-new-income";
import { columns } from "@/features/incomes/components/table/columns";

export async function IncomesView() {
  const incomes = await getAllIncomes();
  return (
    <main className="@container/main flex flex-1 flex-col gap-2 p-6">
      <div className="flex @sm/main:flex-row flex-col @sm/main:justify-between gap-y-4">
        <h2 className="w-full @sm/main:text-left text-center font-bold text-2xl">
          Panel de ingresos
        </h2>
        <DialogNewIncome />
      </div>
      <Suspense fallback={<Spinner />}>
        <DataTable columns={columns} data={incomes} />
      </Suspense>
    </main>
  );
}
