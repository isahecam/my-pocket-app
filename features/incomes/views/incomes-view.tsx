import { DialogIncome } from "../components/dialog-income";

export function IncomesView() {
  return (
    <main className="@container/main flex flex-1 flex-col gap-2 p-6">
      <div className="flex @sm/main:flex-row flex-col @sm/main:justify-between gap-y-4">
        <h2 className="w-full @sm/main:text-left text-center font-bold text-2xl">
          Panel de ingresos
        </h2>
        <DialogIncome />
      </div>
    </main>
  );
}
