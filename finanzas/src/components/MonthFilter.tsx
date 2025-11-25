// src/components/MonthFilter.tsx
import { format, startOfMonth, subMonths } from "date-fns";
import { es } from "date-fns/locale";

type Props = {
  selectedMonth: string; // formato "2025-11" o "all"
  onChange: (month: string) => void;
};

const months = [
  { value: "all", label: "Todo el tiempo" },
  ...Array.from({ length: 12 }, (_, i) => {
    const date = subMonths(new Date(), i);
    return {
      value: format(startOfMonth(date), "yyyy-MM"),
      label: format(date, "MMMM yyyy", { locale: es }),
    };
  }),
];

export default function MonthFilter({ selectedMonth, onChange }: Props) {
  return (
    <select
      value={selectedMonth}
      onChange={(e) => onChange(e.target.value)}
      className="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl font-medium text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {months.map((m) => (
        <option key={m.value} value={m.value}>
          {m.label.charAt(0).toUpperCase() + m.label.slice(1)}
        </option>
      ))}
    </select>
  );
}