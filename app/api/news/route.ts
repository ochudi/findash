import { NextResponse } from "next/server";

let cachedData: any = null;
let lastFetchTime: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

export async function GET() {
  const now = Date.now();

  // Return cached data if still valid
  if (cachedData && now - lastFetchTime < CACHE_DURATION) {
    return NextResponse.json(cachedData);
  }

  try {
    const apiKey = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY;
    const baseURL = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_BASE_URL;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key is missing" },
        { status: 500 }
      );
    }

    const url = `${baseURL}/query?function=NEWS_SENTIMENT&sort=LATEST&limit=5&apikey=${apiKey}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const newsFeed = data.feed.map((newsItem: any) => ({
      title: newsItem.title,
      source: newsItem.source,
      time: newsItem.time_published,
      category: newsItem.category_within_source,
      url: newsItem.url,
    }));

    // Cache the data
    cachedData = newsFeed;
    lastFetchTime = now;

    return NextResponse.json(newsFeed);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
