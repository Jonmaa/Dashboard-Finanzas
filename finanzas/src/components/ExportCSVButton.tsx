import { Download } from "lucide-react";
import type { Transaction } from "../types";
import { format } from "date-fns";
import { es } from "date-fns/locale";

type Props = {
  transactions: Transaction[];
  filename?: string;
};

export default function ExportCSVButton({
  transactions,
  filename = "mis-finanzas",
}: Props) {
  const exportToCSV = () => {
    // Cabeceras
    const headers = ["Fecha", "Descripción", "Categoría", "Tipo", "Monto"];

    // Filas
    const rows = transactions
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .map((t) => [
        format(new Date(t.date), "dd/MM/yyyy HH:mm", { locale: es }),
        `"${t.description}"`,
        t.category,
        t.type === "income" ? "Ingreso" : "Gasto",
        t.amount.toFixed(2),
      ]);

    // Usar ; como separador (OBLIGATORIO para Excel en español)
    const csvContent = [
      headers.join(";"),
      ...rows.map((row) => row.join(";")),
    ].join("\r\n");

    // BOM + contenido
    const bom = "\uFEFF";
    const blob = new Blob([bom + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${filename}_${format(new Date(), "yyyy-MM-dd")}.csv`;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={exportToCSV}
      disabled={transactions.length === 0}
      className="flex items-center gap-3 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-xl transition shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
    >
      <Download size={20} />
      Exportar a CSV
    </button>
  );
}