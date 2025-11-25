import { Trash2 } from "lucide-react";
import type { Transaction } from "../../types";
import { format } from "date-fns";
import { es } from "date-fns/locale";

type Props = {
  transaction: Transaction;
  onDelete: (id: string) => void;
};

export default function TransactionItem({ transaction, onDelete }: Props) {
  const isIncome = transaction.amount > 0;

  return (
    <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition last:border-b-0">
      <div className="flex-1">
        <p className="font-medium text-lg">{transaction.description}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {transaction.category} · {format(new Date(transaction.date), "dd MMM yyyy, HH:mm", { locale: es })}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <span
          className={`text-2xl font-bold ${isIncome ? "text-green-600" : "text-red-600"}`}
        >
          {isIncome ? "+" : "-"}${Math.abs(transaction.amount).toFixed(2)}
        </span>
        <button
          onClick={() => onDelete(transaction.id)}
          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
          title="Eliminar"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}