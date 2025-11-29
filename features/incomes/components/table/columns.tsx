"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteIncomeAction } from "@/features/incomes/actions/delete-income.action";
import type { ForeignCurrency, Income } from "@/shared/domain/models/income";
import { formatCurrency } from "@/shared/helpers/format-currency";

const handleDelete = async (incomeId: Income["id"]) => {
  const { success, message } = await deleteIncomeAction(incomeId);
  if (!success) {
    toast.error(message);
    return;
  }
  toast.success(message);
};

export const columns: ColumnDef<Income>[] = [
  {
    accessorKey: "concept",
    header: "Concepto",
  },
  {
    accessorKey: "amount",
    header: "Monto",
    cell: ({ row }) => {
      const amount = Number(row.getValue("amount"));
      const foreignCurrency = row.getValue(
        "foreign_currency"
      ) as ForeignCurrency;
      return formatCurrency(amount, foreignCurrency);
    },
  },
  {
    accessorKey: "foreign_currency",
    header: "Moneda",
  },
  {
    accessorKey: "date",
    header: "Fecha",
  },
  {
    accessorKey: "details",
    header: "Detalles",
    cell: ({ row }) => {
      const hasDetails = row.getValue("details") as string;
      return hasDetails || "Sin detalles";
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const income = row.original;
      console.log(income);
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="size-8 p-0" variant="ghost">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem>Editar</DropdownMenuItem>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem
                  onSelect={(e) => e.preventDefault()}
                  variant="destructive"
                >
                  Eliminar
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    ¿Estás seguro de querer eliminar este ingreso?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta acción no se puede deshacer. Se eliminará
                    permanentemente el ingreso{" "}
                    <strong>{row.original.concept}</strong>.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDelete(income.id)}>
                    Eliminar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
