import { Transaction } from "@/types/transaction";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useTransactions = () => {
  return useQuery<Transaction[]>({
    queryKey: ["transactions"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/transactions");
        const data = await res.json();

        if (!res.ok) {
          toast.error(data.message || "Gagal memuat transactions");
          return [];
        }

        return data.transactions || [];
      } catch (err) {
        console.error(err);
        toast.error("Terjadi kesalahan pada server.");
        return [];
      }
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
