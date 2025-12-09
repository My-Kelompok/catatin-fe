import { Transaction, TransactionRequest } from "@/types/transaction";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

export function useCreateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: TransactionRequest) => {
      console.log(values);
      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Gagal memuat transactions");
        return;
      }

      return data;
    },
    onSuccess: () => {
      toast.success("Berhasil membuat transaksi");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: (err: Error) => {
      toast.error(err.message || "Terjadi kesalahan pada server.");
    },
  });
}
