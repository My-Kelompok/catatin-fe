"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { BanknoteArrowUp, Loader2, Plus, Save } from "lucide-react";
import z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCreateTransaction } from "@/hooks/use-transactions";

const contactSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required." })
    .max(100, { message: "Title must be at most 100 characters long." }),
  amount: z
    .string()
    .min(1, { message: "Amount is required." })
    .refine((val) => !isNaN(Number(val)), {
      message: "Amount must be a valid number.",
    }),
  transaction_date: z.string(),
});

export function CreateTransactionDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      title: "",
      amount: "",
      transaction_date: new Date().toISOString(),
    },
  });

  const { mutate: createTransaction, isPending } = useCreateTransaction();

  const onSubmit = (values: z.infer<typeof contactSchema>) => {
    console.log(values);
    createTransaction(values, {
      onSuccess: () => {
        form.reset();
        setIsOpen(false);
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          className="size-fit rounded-md bg-blue-700 text-xs text-white hover:bg-blue-800"
        >
          <Plus size={5} />
          Transaksi Baru
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <div>
                <DialogTitle className="flex items-center gap-3">
                  <BanknoteArrowUp size={22} strokeWidth={2} />
                  <span>Tambah Transaksi Baru</span>
                </DialogTitle>
                <DialogDescription>
                  Masukan pemasukan anda dibawah.
                </DialogDescription>
              </div>
            </DialogHeader>

            <div className="grid gap-4 py-5">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukan title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jumlah</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Masukan jumlah"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="transaction_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tanggal Transaksi</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={new Date(field.value).toLocaleString("id-ID", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                        readOnly
                        disabled
                        className="bg-muted cursor-not-allowed"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="mt-2">
              <div>
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    disabled={isPending}
                    className="w-full"
                  >
                    Cancel
                  </Button>
                </DialogClose>
              </div>
              <div className="w-full">
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full cursor-pointer bg-blue-700 hover:bg-blue-800"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <div className="flex items-center gap-2.5">
                      <Save />
                      Save
                    </div>
                  )}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
