import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { IncomeForm } from "./income-form";

export function DialogIncome() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="size-4" />
          Nuevo ingreso
        </Button>
      </DialogTrigger>

      <IncomeForm />
    </Dialog>
  );
}
