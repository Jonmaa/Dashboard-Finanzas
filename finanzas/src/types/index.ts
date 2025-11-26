export type Transaction = {
  id: string;
  description: string;
  amount: number;        
  category: string;
  type: "income" | "expense";
  date: string;         
};

export type Summary = {
  balance: number;
  income: number;
  expenses: number;
};