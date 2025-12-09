"use client";

import CustomBadge from "@/components/common/custom-badge";
import DashboardLatestTransaction from "@/components/dashboard/latest-transaction";
import DashboardOverview from "@/components/dashboard/overview";
import MaxWidthWrapper from "@/components/layout/max-width-wrapper";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { ChevronRight, Hand, MessageSquare, Sparkles } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <MaxWidthWrapper className="px-7 py-8">
      <div className="mx-auto flex max-w-4xl flex-col space-y-3">
        <div>
          <h1 className="flex flex-row items-center gap-2 text-2xl font-bold">
            Halo, <span className="text-blue-700">{user?.name}! </span>{" "}
            <Hand className="animate-bounce text-blue-700" />
          </h1>
          <p className="text-gray-600">
            Berikut ringkasan bisnis Anda bulan ini.
          </p>
        </div>
        {/* Overview */}
        <DashboardOverview />
        <div className="mt-5 grid grid-cols-3 gap-4">
          <div className="col-span-2 space-y-3">
            {/* Latest Transaction */}
            <div className="flex flex-row items-center justify-between">
              <h2 className="text-md font-bold">Transaksi Terakhir</h2>
              <Link
                href={"/dashboard/transaction"}
                className="px-2 text-xs text-gray-600 hover:underline"
              >
                Lihat Semua
              </Link>
            </div>
            <DashboardLatestTransaction />
          </div>
          <div className="col-span-1 space-y-3">
            <h2 className="text-md font-bold">Aksi Cepat</h2>
            <Card className="bg-blue-700 pb-0 text-white">
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-row items-center justify-between">
                    <MessageSquare size={30} />
                    <CustomBadge
                      icon={Sparkles}
                      label={"Fast"}
                      color="text-white"
                    />
                  </div>
                  <div className="space-x-2">
                    <p className="font-semibold">Catat Via AI</p>
                    <p className="text-sm">
                      Input transaksi dengan bahasa sehari-hari.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="rounded-b-md bg-blue-100 p-0 text-blue-700">
                <Link
                  href="/chat"
                  className="flex w-full flex-row items-center justify-between gap-2 rounded-b-md px-6 py-2 text-sm transition hover:bg-blue-200"
                >
                  <p>Mulai Chat</p>
                  <ChevronRight />
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
