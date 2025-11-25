import { useTransactions } from "./hooks/useTransactions";
import DashboardSummary from "./components/DashboardSummary";
import TransactionForm from "./components/transactions/TransactionForm";
import TransactionList from "./components/transactions/TransactionList";
import CategoryPieChart from "./components/charts/CategoryPieChart";
import MonthlyTrendChart from "./components/charts/MonthlyTrendChart";
import MonthFilter from "./components/MonthFilter";
import ExportCSVButton from "./components/ExportCSVButton";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { startOfMonth, endOfMonth, isWithinInterval } from "date-fns";

function App() {
  const { transactions, addTransaction, deleteTransaction } = useTransactions();
  const [darkMode, setDarkMode] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<string>("all");

  // Cargar modo oscuro
  useEffect(() => {
    const isDark = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDark);
    if (isDark) document.documentElement.classList.add("dark");
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", String(newMode));
    document.documentElement.classList.toggle("dark");
  };

  // Filtrar transacciones por mes seleccionado
  const filteredTransactions = selectedMonth === "all"
    ? transactions
    : transactions.filter((t) => {
        const txDate = new Date(t.date);
        const monthStart = startOfMonth(new Date(selectedMonth + "-01"));
        const monthEnd = endOfMonth(monthStart);
        return isWithinInterval(txDate, { start: monthStart, end: monthEnd });
      });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <h1 className="text-5xl font-bold text-gray-800 dark:text-white">
            Finanzas Personales
          </h1>
          <div className="flex flex-wrap items-center gap-4">
            <MonthFilter selectedMonth={selectedMonth} onChange={setSelectedMonth} />
            <ExportCSVButton transactions={filteredTransactions} />
            <button
              onClick={toggleDarkMode}
              className="p-4 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              {darkMode ? <Sun className="w-7 h-7" /> : <Moon className="w-7 h-7" />}
            </button>
          </div>
        </div>

        <DashboardSummary transactions={filteredTransactions} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-1">
            <TransactionForm onAdd={addTransaction} />
          </div>
          <div className="lg:col-span-2 space-y-8">
            <TransactionList transactions={filteredTransactions} onDelete={deleteTransaction} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CategoryPieChart transactions={filteredTransactions} />
          <MonthlyTrendChart transactions={transactions} /> {/* este siempre muestra todo */}
        </div>
      </div>
    </div>
  );
}

export default App;