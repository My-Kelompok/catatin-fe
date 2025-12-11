import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useExpenses } from "@/hooks/use-expenses";
import { useTransactions } from "@/hooks/use-transactions";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import {
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import React from "react";

dayjs.extend(isToday);

export default function DashboardLatestTransaction() {
  const { data: transactions, isLoading: isLoadingTransactions } =
    useTransactions();
  const { data: expenses, isLoading: isLoadingExpenses } = useExpenses();

  const isLoading = isLoadingTransactions || isLoadingExpenses;

  const merged = React.useMemo(() => {
    if (!transactions || !expenses) return [];

    return [
      ...transactions.map((t) => ({
        id: t.id,
        title: t.title,
        amount: Number(t.amount),
        date: t.transaction_date,
        type: "Pemasukan",
      })),
      ...expenses.map((e) => ({
        id: e.id,
        title: e.title,
        amount: Number(e.amount),
        date: e.expense_date,
        type: "Pengeluaran",
      })),
    ]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 4);
  }, [transactions, expenses]);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-300">
      <Table className="px-2">
        <TableHeader className="bg-blue-100/20">
          <TableRow className="*:text-gray-600">
            <TableHead className="pl-3.5">TYPE</TableHead>
            <TableHead>LAYANAN</TableHead>
            <TableHead>TANGGAL</TableHead>
            <TableHead className="pr-5 text-right">NOMINAL</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white">
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={3} className="py-4 text-center">
                Loading...
              </TableCell>
            </TableRow>
          ) : merged.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="py-4 text-center text-gray-500">
                Belum ada transaksi
              </TableCell>
            </TableRow>
          ) : (
            merged.map((transaction) => {
              const date = dayjs(transaction.date);
              const formattedDate = date.isToday()
                ? `Hari ini, ${date.format("HH:mm")}`
                : date.format("DD MMM YYYY");
              const isIncome = transaction.type === "Pemasukan" ? true : false;

              return (
                <TableRow key={transaction.id}>
                  <TableCell className="pl-5">
                    {isIncome ? (
                      <TrendingUp size={18} className="text-green-700" />
                    ) : (
                      <TrendingDown size={18} className="text-red-700" />
                    )}
                  </TableCell>
                  <TableCell className="max-w-40 overflow-hidden font-medium text-ellipsis md:max-w-50">
                    {transaction.title}
                  </TableCell>
                  <TableCell>{formattedDate}</TableCell>
                  <TableCell className="pr-5 text-right">
                    {transaction.amount}
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
