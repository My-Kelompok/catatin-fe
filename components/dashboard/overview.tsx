import { Wallet } from "lucide-react";
import DashboardCard from "../common/dashboard-card";

export default function DashboardOverview() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <DashboardCard
        icon={Wallet}
        label={"Total Pemasukan"}
        value={"Rp. 12.500.000"}
        percentage={"+12%"}
      />
      <DashboardCard
        icon={Wallet}
        label={"Total Pemasukan"}
        value={"Rp. 12.500.000"}
        percentage={"+12%"}
      />
      <DashboardCard
        icon={Wallet}
        label={"Total Pemasukan"}
        value={"Rp. 12.500.000"}
        percentage={"+12%"}
      />
    </div>
  );
}
