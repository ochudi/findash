import { NextResponse } from "next/server";

let cachedData: any = null;
let lastFetchTime = 0;
const CACHE_DURATION = 60 * 1000; // 60 seconds

export async function GET() {
  const apiKey = process.env.NEXT_PUBLIC_COINRANKING_API_KEY;
  const baseUrl = process.env.NEXT_PUBLIC_COINRANKING_BASE_URL;
  const now = Date.now();

  // Serve cached data if it's still valid
  if (cachedData && now - lastFetchTime < CACHE_DURATION) {
    return NextResponse.json(cachedData);
  }

  try {
    const res = await fetch(`${baseUrl}/coins?limit=5`, {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": apiKey as string,
      },
      next: { revalidate: 60 }, // Cache this API response for 60 seconds
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch coins: ${res.statusText}`);
    }

    const data = await res.json();
    cachedData = data;
    lastFetchTime = now;

    return NextResponse.json(data);
  } catch (error) {
    // Return cached data if API fails
    if (cachedData) {
      return NextResponse.json(cachedData);
    }
    return NextResponse.json({ error: "Failed to fetch coins" }, { status: 500 });
  }
}
