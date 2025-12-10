import { Expense, ExpenseRequest } from "@/types/expense";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useExpenses = () => {
  return useQuery<Expense[]>({
    queryKey: ["expenses"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/expenses");
        const data = await res.json();

        if (!res.ok) {
          toast.error(data.message || "Gagal memuat expenses");
          return [];
        }

        return data.expenses || [];
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

export function useCreateExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: ExpenseRequest) => {
      const res = await fetch("/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Gagal membuat expese");
        return;
      }

      return data;
    },
    onSuccess: () => {
      toast.success("Berhasil membuat expense");
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
    onError: (err: Error) => {
      toast.error(err.message || "Terjadi kesalahan pada server.");
    },
  });
}
