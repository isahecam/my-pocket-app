"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DollarSignIcon, FileTextIcon, Loader2Icon } from "lucide-react";
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
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
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
import { CreateIncome, createIncomeSchema } from "@/features/incomes/schemas/income.schema";

import { createIncomeAction } from "../actions/create-income.action";

export function IncomeForm() {
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

  const onSubmit = async (input: CreateIncome) => {
    const { success, message } = await createIncomeAction(input);
    if (!success) {
      return toast.error(message);
    }
    return toast.success(message);
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
              name="concept"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="col-span-2">
                  <FieldLabel htmlFor="income-form-concept">Concepto</FieldLabel>
                  <Input
                    {...field}
                    id="income-form-concept"
                    disabled={form.formState.isSubmitting}
                    aria-invalid={fieldState.invalid}
                    placeholder="Ej: Salario mensual, devolución de impuestos, ingreso por freelance"
                    autoComplete="off"
                    type="text"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* Amount Field */}
            <Controller
              name="amount"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="income-form-amount">Monto</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      {...field}
                      placeholder="Ej: 100.00"
                      disabled={form.formState.isSubmitting}
                      id="income-form-amount"
                      type="number"
                      value={field.value || ""}
                      onChange={e => {
                        const value = e.target.value;
                        field.onChange(value === "" ? undefined : Number(value));
                      }}
                    />
                    <InputGroupAddon>
                      <DollarSignIcon />
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* Foreign Currency Field */}
            <Controller
              name="foreign_currency"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="income-form-foreign-currency">Tipo de moneda</FieldLabel>
                  <Select
                    name={field.name}
                    value={field.value}
                    disabled={form.formState.isSubmitting}
                    onValueChange={field.onChange}>
                    <SelectTrigger
                      id="income-form-foreign-currency"
                      aria-invalid={fieldState.invalid}
                      className="min-w-[120px]">
                      <SelectValue placeholder="MXN o USD" />
                    </SelectTrigger>
                    <SelectContent position="item-aligned">
                      <SelectItem value="MXN">MXN (Peso Mexicano)</SelectItem>
                      <SelectItem value="USD">USD (Dólar Estadounidense)</SelectItem>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* Date Field */}
            <Controller
              name="date"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="col-span-2">
                  <FieldLabel htmlFor="income-form-date">Fecha</FieldLabel>
                  <Input
                    {...field}
                    id="income-form-date"
                    disabled={form.formState.isSubmitting}
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    type="date"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* Details Field */}
            <Controller
              name="details"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="col-span-2">
                  <FieldLabel htmlFor="income-form-details">Detalles</FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="income-form-details"
                      disabled={form.formState.isSubmitting}
                      placeholder="Agrega detalles del ingreso"
                      rows={4}
                      className="min-h-26 resize-none"
                      aria-invalid={fieldState.invalid}
                    />
                  </InputGroup>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </div>
        </FieldGroup>
      </form>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline" disabled={form.formState.isSubmitting}>
            Cancelar
          </Button>
        </DialogClose>
        <Button form="income-form" type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting && (
            <>
              <Loader2Icon className="size-4 animate-spin" /> Agregando
            </>
          )}
          {!form.formState.isSubmitting && "Agregar"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
