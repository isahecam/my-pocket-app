import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { FormNewIncome } from "./form-new-income";

export function DialogNewIncome() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="size-4" />
          Nuevo ingreso
        </Button>
      </DialogTrigger>

      <FormNewIncome />
    </Dialog>
  );
}
