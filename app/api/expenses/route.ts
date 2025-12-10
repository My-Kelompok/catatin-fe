import { Expense } from "@/types/expense";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const token = (await cookies()).get("auth-token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/expenses`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const json = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { message: json.message || "Gagal memuat expenses" },
        { status: res.status },
      );
    }

    const expenses = json.data || [];
    const paging = json.paging || {};

    const response = NextResponse.json({
      expenses: expenses.map((expense: Expense) => ({
        id: expense.id,
        title: expense.title,
        amount: expense.amount,
        expense_date: expense.expense_date,
      })),
      paging,
      message: "Expense berhasil difetch",
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/expenses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(body),
    });

    const json = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { message: json.message || "Gagal membuat expense" },
        { status: res.status },
      );
    }

    const data = json.data;

    const response = NextResponse.json({
      expense: {
        id: data.id,
        title: data.title,
        amount: data.amount,
        expense_date: data.expense_date,
      },
      message: "Berhasil membuat expense",
    });

    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
