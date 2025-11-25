import { useState } from "react";
import { Plus } from "lucide-react";

const incomeCategories = ["Sueldo", "Freelance", "Inversión", "Regalo", "Otros ingresos"];
const expenseCategories = ["Comida", "Transporte", "Entretenimiento", "Servicios", "Salud", "Compras", "Otros gastos"];

type Props = {
  onAdd: (data: {
    description: string;
    amount: number;
    category: string;
    type: "income" | "expense";
    date: string;
  }) => void;
};

export default function TransactionForm({ onAdd }: Props) {
  const [type, setType] = useState<"income" | "expense">("expense");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(type === "expense" ? expenseCategories[0] : incomeCategories[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !description) return;

    onAdd({
      description,
      amount: type === "expense" ? -parseFloat(amount) : parseFloat(amount),
      category,
      type,
      date: new Date().toISOString(),
    });

    setAmount("");
    setDescription("");
    setCategory(type === "expense" ? expenseCategories[0] : incomeCategories[0]);
  };

  // Cambiar categoría al cambiar tipo
  const handleTypeChange = (newType: "income" | "expense") => {
    setType(newType);
    setCategory(newType === "expense" ? expenseCategories[0] : incomeCategories[0]);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-6">Nueva transacción</h2>

      <div className="flex gap-3 mb-6">
        <button
          onClick={() => handleTypeChange("expense")}
          className={`flex-1 py-3 rounded-xl font-medium transition ${
            type === "expense"
              ? "bg-red-500 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
          }`}
        >
          Gasto
        </button>
        <button
          onClick={() => handleTypeChange("income")}
          className={`flex-1 py-3 rounded-xl font-medium transition ${
            type === "income"
              ? "bg-green-500 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
          }`}
        >
          Ingreso
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="number"
          step="0.01"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="input text-2xl font-semibold"
          required
        />

        <input
          type="text"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input"
          required
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input"
        >
          {(type === "expense" ? expenseCategories : incomeCategories).map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full btn btn-primary flex items-center justify-center gap-2 text-lg"
        >
          <Plus size={24} />
          Agregar transacción
        </button>
      </form>
    </div>
  );
}