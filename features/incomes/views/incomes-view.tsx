import { DialogIncome } from "../components/dialog-income";

export function IncomesView() {
  return (
    <main className="@container/main flex flex-1 flex-col gap-2 p-6">
      <div className="flex flex-col gap-y-4 @sm/main:flex-row @sm/main:justify-between">
        <h2 className="w-full text-center text-2xl font-bold @sm/main:text-left">
          Panel de ingresos
        </h2>
        <DialogIncome />
      </div>
    </main>
  );
}
