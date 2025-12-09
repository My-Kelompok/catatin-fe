import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTransactions } from "@/hooks/use-transactions";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";

dayjs.extend(isToday);

export default function DashboardLatestTransaction() {
  const { data: transactions = [], isLoading } = useTransactions();

  return (
    <div className="overflow-hidden rounded-xl border border-gray-300">
      <Table className="px-2">
        <TableHeader className="bg-blue-100/20">
          <TableRow className="*:text-gray-600">
            <TableHead className="pl-5">LAYANAN</TableHead>
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
          ) : transactions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="py-4 text-center text-gray-500">
                Belum ada transaksi
              </TableCell>
            </TableRow>
          ) : (
            transactions.map((transaction) => {
              const date = dayjs(transaction.transaction_date);
              const formattedDate = date.isToday()
                ? `Hari ini, ${date.format("HH:mm")}`
                : date.format("DD MMM YYYY");

              return (
                <TableRow key={transaction.id}>
                  <TableCell className="pl-5 font-medium">
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
