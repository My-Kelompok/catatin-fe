import { CreateTransactionDialog } from "@/components/transaction/create-transaction-dialog";

export default function DashboardHeader() {
  return (
    <header
      className={`fixed top-0 z-50 w-full border-b border-b-gray-200 bg-white md:w-[calc(100%-var(--sidebar-width))]`}
    >
      <div className="mx-auto flex w-full items-center justify-end px-6 py-3">
        {/* <h1 className="text-xl font-bold">
          Catat<span className="text-blue-700">In</span>
        </h1> */}
        <nav className="space-x-3">
          {/* <Button
            asChild
            className="rounded-md bg-blue-700 text-sm text-white hover:bg-blue-800"
          >
            <Link href="/auth/register">
              <Plus size={10} />
              Transaksi Baru
            </Link>
          </Button> */}
          <CreateTransactionDialog />
        </nav>
      </div>
    </header>
  );
}
