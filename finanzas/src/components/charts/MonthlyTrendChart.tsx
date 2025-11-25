import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import type { Transaction } from "../../types";
import { format, startOfMonth, subMonths } from "date-fns";

type Props = {
  transactions: Transaction[];
};

export default function MonthlyTrendChart({ transactions }: Props) {
  // Últimos 6 meses
  const months = Array.from({ length: 6 }, (_, i) => {
    const date = subMonths(new Date(), 5 - i);
    return startOfMonth(date);
  });

  const data = months.map(month => {
    const monthTxs = transactions.filter(t => {
      const txDate = new Date(t.date);
      return txDate.getMonth() === month.getMonth() && txDate.getFullYear() === month.getFullYear();
    });

    const income = monthTxs.filter(t => t.amount > 0).reduce((a, t) => a + t.amount, 0);
    const expenses = Math.abs(monthTxs.filter(t => t.amount < 0).reduce((a, t) => a + t.amount, 0));

    return {
      name: format(month, "MMM"),
      income,
      expenses,
      balance: income - expenses,
    };
  });

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-6">Evolución mensual</h2>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
          <Line type="monotone" dataKey="income" stroke="#10B981" strokeWidth={3} name="Ingresos" />
          <Line type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={3} name="Gastos" />
          <Line type="monotone" dataKey="balance" stroke="#3B82F6" strokeWidth={3} name="Balance neto" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}