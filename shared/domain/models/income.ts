export type ForeignCurrency = "MXN" | "USD";

export type Income = {
  id: string;
  amount: number;
  concept: string;
  created_at: string;
  date: string;
  details: string;
  foreign_currency: ForeignCurrency;
};
