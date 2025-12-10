import { useTransactions } from "@/hooks/use-transactions";
import { useExpenses } from "@/hooks/use-expenses";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import React from "react";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";

dayjs.extend(isToday);

export default function TransactionTable() {
  const { data: transactions, isLoading: isLoadingTransactions } = useTransactions();
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
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [transactions, expenses]);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-300">
      <Table>
        <TableHeader className="bg-blue-100/20">
          <TableRow className="*:text-gray-600">
            <TableHead className="pl-5">TANGGAL</TableHead>
            <TableHead>LAYANAN</TableHead>
            <TableHead>TIPE</TableHead>
            <TableHead className="pr-5 text-right">JUMLAH</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="bg-white">
          {isLoading && (
            <TableRow>
              <TableCell colSpan={4} className="py-4 text-center">
                Loading...
              </TableCell>
            </TableRow>
          )}

          {!isLoading && merged.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="py-4 text-center text-gray-500">
                Belum ada transaksi
              </TableCell>
            </TableRow>
          )}

          {!isLoading &&
            merged.map((item) => {
              const date = dayjs(item.date);
              const formattedDate = date.isToday()
                ? `Hari ini, ${date.format("HH:mm")}`
                : date.format("DD MMM YYYY");

              return (
                <TableRow key={item.id}>
                  <TableCell className="pl-5">
                    {formattedDate}
                  </TableCell>

                  <TableCell>{item.title}</TableCell>

                  <TableCell>
                    <div className={`border border-gray-400 w-fit py-[0.7px] px-2 rounded-full text-xs ${item.type === "Pemasukan" ? "text-green-700 border border-green-200 bg-green-100" : "text-red-700 border-red-200 bg-red-100"}`}>
                      {item.type}
                    </div>
                  </TableCell>

                  <TableCell className="pr-5 text-right">
                    Rp {item.amount.toLocaleString("id-ID")}
                  </TableCell>
                </TableRow>
              )
            }
            )}
        </TableBody>
      </Table>
    </div>
  );
}
