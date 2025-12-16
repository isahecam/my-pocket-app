"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DollarSignIcon, FileTextIcon, Loader2Icon } from "lucide-react";
import { useTransition } from 'react';
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createIncomeAction } from "@/features/incomes/actions/create-income.action";
import {
  type CreateIncome,
  createIncomeSchema,
} from "@/features/incomes/schemas/income.schema";

export function FormNewIncome() {
const [isPending, startTransition] = useTransition();

  const form = useForm<CreateIncome>({
    resolver: zodResolver(createIncomeSchema),
    defaultValues: {
      concept: "",
      details: "",
      amount: 0,
      date: "",
      foreign_currency: "MXN",
    },
  });

  const onSubmit = (input: CreateIncome) => {
    startTransition(async () => {
      const { success, message } = await createIncomeAction(input);
      if (!success) {
        toast.error(message);
        return;
      }
      toast.success(message);
      form.reset();
    });
  };

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <div className="flex items-center gap-x-2">
          <FileTextIcon size={20} />
          <DialogTitle>Agregar nuevo ingreso</DialogTitle>
        </div>
      </DialogHeader>

      <form id="income-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <div className="grid grid-flow-row-dense grid-cols-2 gap-4">
            {/* Concept Field */}
            <Controller
              control={form.control}
              name="concept"
              render={({ field, fieldState }) => (
                <Field className="col-span-2" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="income-form-concept">
                    Concepto
                  </FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    autoComplete="on"
                    disabled={isPending}
                    id="income-form-concept"
                    placeholder="Ej: Salario mensual, devolución de impuestos, ingreso por freelance"
                    type="text"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Amount Field */}
            <Controller
              control={form.control}
              name="amount"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="income-form-amount">Monto</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      {...field}
                      disabled={isPending}
                      id="income-form-amount"
                      placeholder="0.00"
                      type="number"
                    />
                    <InputGroupAddon>
                      <DollarSignIcon />
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Foreign Currency Field */}
            <Controller
              control={form.control}
              name="foreign_currency"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="income-form-foreign-currency">
                    Tipo de moneda
                  </FieldLabel>
                  <Select
                    disabled={isPending}
                    name={field.name}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger
                      aria-invalid={fieldState.invalid}
                      className="min-w-[120px]"
                      id="income-form-foreign-currency"
                    >
                      <SelectValue placeholder="MXN o USD" />
                    </SelectTrigger>
                    <SelectContent position="item-aligned">
                      <SelectItem value="MXN">MXN (Peso Mexicano)</SelectItem>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Date Field */}
            <Controller
              control={form.control}
              name="date"
              render={({ field, fieldState }) => (
                <Field className="col-span-2" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="income-form-date">Fecha</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    disabled={isPending}
                    id="income-form-date"
                    type="date"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Details Field */}
            <Controller
              control={form.control}
              name="details"
              render={({ field, fieldState }) => (
                <Field className="col-span-2" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="income-form-details">
                    Detalles
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      aria-invalid={fieldState.invalid}
                      className="min-h-26 resize-none"
                      disabled={isPending}
                      id="income-form-details"
                      placeholder="Agrega detalles del ingreso"
                      rows={4}
                    />
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
        </FieldGroup>
      </form>
      <DialogFooter>
        <DialogClose asChild>
          <Button disabled={isPending} variant="outline">
            Cancelar
          </Button>
        </DialogClose>
        <Button
          disabled={isPending}
          form="income-form"
          type="submit"
        >
          {isPending && (
            <>
              <Loader2Icon className="size-4 animate-spin" /> Agregando
            </>
          )}
          {!isPending && "Agregar"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
