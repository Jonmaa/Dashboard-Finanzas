import type { Transaction } from "../../types";
import TransactionItem from "./TransactionItem";

type Props = {
  transactions: Transaction[];
  onDelete: (id: string) => void;
};

export default function TransactionList({ transactions, onDelete }: Props) {
  if (transactions.length === 0) return null;

  const sorted = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold">Últimas transacciones</h2>
      </div>

      <div className="max-h-96 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-700">
        {sorted.map((t) => (
          <TransactionItem key={t.id} transaction={t} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
}