import { z } from "zod";

export const incomeSchema = z.object({
  concept: z
    .string("El concepto es requerido")
    .min(5, "El concepto debe tener al menos 5 caracteres"),
  details: z.string().default("").optional(),
  amount: z
    .number("El monto debe ser un número")
    .positive("El monto debe ser mayor que cero"),
  date: z.iso.date("La fecha es requerida"),
  foreign_currency: z.enum(["MXN", "USD"], {
    message: "Seleccione un tipo de moneda",
  }),
});
