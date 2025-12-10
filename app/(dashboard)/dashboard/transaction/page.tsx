"use client";

import MaxWidthWrapper from "@/components/layout/max-width-wrapper";
import TransactionTable from "@/components/transaction/transactions-table";

export default function TransactionPage() {
  return (
    <MaxWidthWrapper className="px-7 py-8">
      <div className="mx-auto flex max-w-4xl flex-col space-y-3">
        <div>
          <h1 className="flex flex-row items-center gap-2 text-2xl font-bold">
            Daftar Transaksi
          </h1>
          <p className="text-gray-600">
            Kelola semua data pemasukan dan pengeluaran.
          </p>
        </div>
        <TransactionTable />
      </div>
    </MaxWidthWrapper>
  )
}
