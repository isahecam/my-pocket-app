export const formatCurrency = (amount: number, currencyType: string) =>
  new Intl.NumberFormat("es-MX", { style: "currency", currency: currencyType }).format(amount);
