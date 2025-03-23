// app/api/stocks/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.NEXT_PUBLIC_TWELVEDATA_API_KEY;
  const baseUrl = process.env.NEXT_PUBLIC_TWELVEDATA_BASE_URL;
  const symbols = "AAPL,MSFT,GOOGL,AMZN,TSLA";
  const res = await fetch(
    `${baseUrl}/quote?symbol=${symbols}&apikey=${apiKey}`,
    {
      next: { revalidate: 60 }, // cache for 60 seconds
    }
  );

  if (!res.ok) {
    const errorData = await res.json();
    return NextResponse.json(
      { error: errorData.message || "Failed to fetch stocks" },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
