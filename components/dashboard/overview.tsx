import { BanknoteArrowDown, BanknoteArrowUp, Wrench } from "lucide-react";
import DashboardCard from "../common/dashboard-card";
import { useTransactions } from "@/hooks/use-transactions";
import { useExpenses } from "@/hooks/use-expenses";

export default function DashboardOverview() {
  const { data: transactions = [] } = useTransactions();
  const { data: expenses = [] } = useExpenses();

  const totalIncome = transactions.reduce((acc, transaction) => {
    return acc + Number(transaction.amount || 0);
  }, 0);

  const totalOutcome = expenses.reduce((acc, expense) => {
    return acc + Number(expense.amount || 0);
  }, 0);

  const totalService = transactions.length;

  return (
    <div className="grid grid-cols-3 gap-4">
      <DashboardCard
        icon={BanknoteArrowUp}
        label={"Total Pemasukan"}
        value={`Rp. ${totalIncome.toLocaleString("id-ID")}`}
        percentage={"-"}
      />
      <DashboardCard
        icon={Wrench}
        label={"Total Layanan"}
        value={`${totalService} Jasa`}
        percentage={"-"}
        iconColor="text-blue-700"
        iconBgColor="bg-blue-300/50"
      />
      <DashboardCard
        icon={BanknoteArrowDown}
        label={"Total Pengeluaran"}
        value={`Rp. ${totalOutcome.toLocaleString("id-ID")}`}
        percentage={"-"}
        iconColor="text-red-700"
        iconBgColor="bg-red-300/50"
      />
    </div>
  );
}
