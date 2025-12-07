import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const transactions = [
  {
    id: "1",
    title: "Cuci AC Split 1PK",
    amount: "+ Rp 75.000",
    transactionDate: "Hari ini, 10:30",
  },
  {
    id: "2",
    title: "Cuci AC Split 1PK",
    amount: "+ Rp 75.000",
    transactionDate: "Hari ini, 10:30",
  },
  {
    id: "3",
    title: "Cuci AC Split 1PK",
    amount: "+ Rp 75.000",
    transactionDate: "Hari ini, 10:30",
  },
  {
    id: "4",
    title: "Cuci AC Split 1PK",
    amount: "+ Rp 75.000",
    transactionDate: "Hari ini, 10:30",
  },
  {
    id: "5",
    title: "Cuci AC Split 1PK",
    amount: "+ Rp 75.000",
    transactionDate: "Hari ini, 10:30",
  },
];

export function LatestTable() {
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
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className="pl-5 font-medium">
                {transaction.title}
              </TableCell>
              <TableCell>{transaction.transactionDate}</TableCell>
              <TableCell className="pr-5 text-right">
                {transaction.amount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
