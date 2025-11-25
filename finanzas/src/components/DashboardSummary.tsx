import { ArrowUpRight, ArrowDownRight, Wallet } from "lucide-react";
import type { Transaction } from "../types";

interface Props {
  transactions: Transaction[];
}

export default function DashboardSummary({ transactions }: Props) {
  const balance = transactions.reduce((acc, t) => acc + t.amount, 0);
  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);
  const expenses = Math.abs(
    transactions
      .filter((t) => t.amount < 0)
      .reduce((acc, t) => acc + t.amount, 0)
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Balance total */}
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Balance actual</p>
            <p className={`text-4xl font-bold mt-2 ${balance >= 0 ? "text-green-600" : "text-red-600"}`}>
              ${balance.toFixed(2)}
            </p>
          </div>
          <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-full">
            <Wallet className="w-8 h-8 text-blue-600 dark:text-blue-300" />
          </div>
        </div>
      </div>

      {/* Ingresos */}
      <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-8 rounded-2xl shadow-lg text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 text-sm">Ingresos del mes</p>
            <p className="text-4xl font-bold mt-2">${income.toFixed(2)}</p>
          </div>
          <ArrowUpRight className="w-10 h-10 opacity-80" />
        </div>
      </div>

      {/* Gastos */}
      <div className="bg-gradient-to-br from-red-500 to-rose-600 p-8 rounded-2xl shadow-lg text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-red-100 text-sm">Gastos del mes</p>
            <p className="text-4xl font-bold mt-2">${expenses.toFixed(2)}</p>
          </div>
          <ArrowDownRight className="w-10 h-10 opacity-80" />
        </div>
      </div>
    </div>
  );
}