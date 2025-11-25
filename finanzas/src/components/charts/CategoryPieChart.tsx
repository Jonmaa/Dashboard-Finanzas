// src/components/charts/CategoryPieChart.tsx

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import type { Transaction } from "../../types";

const COLORS = [
  "#3B82F6", "#10B981", "#F59E0B", "#EF4444",
  "#8B5CF6", "#EC4899", "#14B8A6", "#F97316",
  "#6366F1", "#0EA5E9"
];

type Props = {
  transactions: Transaction[];
};

export default function CategoryPieChart({ transactions }: Props) {
  const expenses = transactions
    .filter(t => t.amount < 0)
    .reduce((acc: Record<string, number>, t) => {
      const cat = t.category;
      acc[cat] = (acc[cat] || 0) + Math.abs(t.amount);
      return acc;
    }, {});

  const data = Object.entries(expenses)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);

  if (data.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 text-center">
        <p className="text-gray-500">No hay gastos aún para mostrar</p>
      </div>
    );
  }

  // Esta es la forma que TypeScript acepta sin quejarse (con aserciones seguras)
  const customLabel = (props: any) => {
    const { name, percent } = props;
    if (!name || percent === undefined) return null;
    return `${name} ${(percent * 100).toFixed(0)}%`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-6">Gastos por categoría</h2>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={customLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}