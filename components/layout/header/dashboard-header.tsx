import CustomBadge from "@/components/common/custom-badge";
import { CreateExpenseDialog } from "@/components/expenses/create-expense-dialog";
import { CreateTransactionDialog } from "@/components/transaction/create-transaction-dialog";
import { Zap } from "lucide-react";

export default function DashboardHeader() {
  return (
    <header
      className={`fixed top-0 z-50 h-[61px] w-full border-b border-b-gray-200 bg-white md:w-[calc(100%-var(--sidebar-width))]`}
    >
      <div className="mx-auto flex h-full w-full items-center justify-end px-6 py-3">
        {/* <h1 className="text-xl font-bold">
          Catat<span className="text-blue-700">In</span>
        </h1> */}
        <nav className="flex items-center gap-4 rounded-md bg-blue-300/50 px-2 py-1">
          <CustomBadge
            icon={Zap}
            label={"Quick Feature"}
            iconColor="text-white"
            textColor="text-white"
            bgColor="bg-blue-500"
          />

          <div className="space-x-2">
            <CreateTransactionDialog />
            <CreateExpenseDialog />
          </div>
        </nav>
      </div>
    </header>
  );
}
