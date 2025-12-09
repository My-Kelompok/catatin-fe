import { Transaction } from "@/types/transaction";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const token = (await cookies()).get("auth-token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/transactions`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      },
    );

    const json = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { message: json.message || "Gagal memuat transactions" },
        { status: res.status },
      );
    }

    const transactions = json.data || [];
    const paging = json.paging || {};

    const response = NextResponse.json({
      transactions: transactions.map((transaction: Transaction) => ({
        id: transaction.id,
        title: transaction.title,
        amount: transaction.amount,
        transaction_date: transaction.transaction_date,
      })),
      paging,
      message: "Transaction berhasil difetch",
    });

    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const token = (await cookies()).get("auth-token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/transactions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(body),
      },
    );

    const json = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { message: json.message || "Gagal membuat transaksi" },
        { status: res.status },
      );
    }

    const data = json.data;

    const response = NextResponse.json({
      transaction: {
        id: data.id,
        title: data.title,
        amount: data.amount,
        transaction_date: data.transaction_date,
      },
      message: "Berhasil membuat transaksi",
    });

    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
