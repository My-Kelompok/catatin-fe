import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
    );

    const json = await res.json();

    if (res.status === 401) {
      return NextResponse.json(
        { message: "Email or password is invalid" },
        { status: 401 },
      );
    }

    if (!res.ok) {
      return NextResponse.json(
        { message: json.message || "Login gagal" },
        { status: res.status },
      );
    }

    const data = json.data;

    const response = NextResponse.json({
      message: "Login berhasil",
    });

    response.cookies.set("auth-token", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
