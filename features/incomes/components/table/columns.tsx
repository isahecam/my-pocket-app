"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteIncomeAlertConfirm } from '@/features/incomes/components/delete-income-alert-confirm';
import type { Income } from "@/shared/domain/models/income";

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
      ) as Income["foreign_currency"];

      const formmatedAmount = new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: foreignCurrency,
      }).format(amount);

      return formmatedAmount;
    },
  },
  {
    accessorKey: "foreign_currency",
    header: "Moneda",
  },
  {
    accessorKey: "date",
    header: "Fecha",
    cell: ({ row }) => {
      const date = row.getValue("date") as Income["date"];

      const formattedDate = new Intl.DateTimeFormat("es-MX", {
        dateStyle: "long",
        timeZone: "America/Mexico_City",
      }).format(new Date(`${date}T12:00:00`));

      return formattedDate;
    },
  },
  {
    accessorKey: "details",
    header: "Detalles",
    cell: ({ row }) => {
      const hasDetails = row.getValue("details") as Income["details"];
      return hasDetails || "Sin detalles";
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const income = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="size-8 p-0" variant="ghost">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem>Editar</DropdownMenuItem>
            <DeleteIncomeAlertConfirm income={income} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
