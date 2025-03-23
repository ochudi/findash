import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.NEXT_PUBLIC_COINRANKING_API_KEY;
  const baseUrl = process.env.NEXT_PUBLIC_COINRANKING_BASE_URL;

  // Fetch the top 5 coins (Bitcoin, Ethereum, Binance Coin, Solana, Cardano)
  const res = await fetch(`${baseUrl}/coins?limit=5`, {
    headers: {
      "Content-Type": "application/json",
      "x-access-token": apiKey as string,
    },
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch coins" },
      { status: res.status }
    );
  }

  const data = await res.json();
  console.log(data?.data?.coins);
  return NextResponse.json(data);
}
