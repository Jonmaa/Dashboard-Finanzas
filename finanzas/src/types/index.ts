export type Transaction = {
  id: string;
  description: string;
  amount: number;        // positivo = ingreso, negativo = gasto
  category: string;
  type: "income" | "expense";
  date: string;          // ISO string, ej: "2025-11-25T10:30:00.000Z"
};

export type Summary = {
  balance: number;
  income: number;
  expenses: number;
};