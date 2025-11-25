import { useTransactions } from "./hooks/useTransactions";
import DashboardSummary from "./components/DashboardSummary";
import TransactionForm from "./components/transactions/TransactionForm";
import TransactionList from "./components/transactions/TransactionList";
import CategoryPieChart from "./components/charts/CategoryPieChart";
import MonthlyTrendChart from "./components/charts/MonthlyTrendChart";
import ExportCSVButton from "./components/ExportCSVButton";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

function App() {
  const { transactions, addTransaction, deleteTransaction } = useTransactions();
  const [darkMode, setDarkMode] = useState(false);

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 dark:text-white">
            Finanzas Personales
          </h1>
          <div className="flex items-center gap-6">
            <ExportCSVButton transactions={transactions} filename="mis-finanzas" />
    
            <button
              onClick={toggleDarkMode}
              className="p-4 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              {darkMode ? <Sun className="w-7 h-7" /> : <Moon className="w-7 h-7" />}
            </button>
          </div>
        </div>

        <DashboardSummary transactions={transactions} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-1">
            <TransactionForm onAdd={addTransaction} />
          </div>
          <div className="lg:col-span-2 space-y-8">
            <TransactionList transactions={transactions} onDelete={deleteTransaction} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CategoryPieChart transactions={transactions} />
          <MonthlyTrendChart transactions={transactions} />
        </div>
      </div>
    </div>
  );
}

export default App;