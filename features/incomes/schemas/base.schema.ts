import { z } from "zod";

export const incomeSchema = z.object({
  concept: z
    .string("Establece un concepto de ingreso")
    .min(5, "El concepto debe tener al menos 5 caracteres"),
  details: z.string().default("").optional(),
  amount: z.coerce.number<number>("El monto debe ser un número")
    .positive("El monto debe ser mayor a cero"),
  date: z.iso.date("Ingresa la fecha del ingreso"),
  foreign_currency: z.enum(["MXN"], {
    message: "Selecciona un tipo de moneda",
  }),
});
