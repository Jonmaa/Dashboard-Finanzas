import { useState, useEffect } from "react";
import type { Transaction } from "../types";

const STORAGE_KEY = "moneyflow_transactions";

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Cargar desde localStorage al iniciar
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setTransactions(JSON.parse(saved));
    }
  }, []);

  // Guardar cada vez que cambien
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (data: Omit<Transaction, "id">) => {
    const newTx: Transaction = {
      ...data,
      id: Date.now().toString(),
    };
    setTransactions((prev) => [...prev, newTx]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  return {
    transactions,
    addTransaction,
    deleteTransaction,
  };
};