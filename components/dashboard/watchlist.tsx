"use client";

import React, { useEffect } from "react";
import useSWR from "swr";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, Plus } from "lucide-react";
import { useToast } from "@/components/hooks/use-toast";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// Only allow these stock symbols in the watchlist
const allowedWatchlist = ["AAPL", "TSLA", "AMZN", "GOOGL", "MSFT"];

const Watchlist = () => {
  const { toast } = useToast();
  const { data, error } = useSWR("/api/stocks", fetcher);

  // Show an error toast if there's an error fetching the data
  useEffect(() => {
    if (error) {
      toast({
        title: "API Error",
        description: "The stock data API appears to be down. Please try again later.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  if (!data && error) return <div>Error loading stock data.</div>;
  if (!data) return <div>Loading...</div>;

  // The stocks API returns an object keyed by stock symbols.
  const stocks = data || {};

  // Filter to only include allowed watchlist stocks.
  const watchlistStocks = Object.keys(stocks)
    .filter((key) => allowedWatchlist.includes(key))
    .reduce((acc, key) => {
      acc[key] = stocks[key];
      return acc;
    }, {} as Record<string, any>);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Watchlist</CardTitle>
        <CardDescription>Track your favorite assets</CardDescription>
      </CardHeader>
      <CardContent className="m-1">
        <div className="space-y-4">
          {Object.keys(watchlistStocks).map((symbol) => {
            const stock = watchlistStocks[symbol];
            // Use the "close" price as the current price
            const price = stock.close
              ? `$${Number(stock.close).toFixed(2)}`
              : "N/A";
            const change =
              stock.change !== undefined
                ? Number(stock.change) >= 0
                  ? `+${stock.change}`
                  : stock.change
                : "N/A";
            const negative = Number(stock.change) < 0;
            return (
              <WatchlistItem
                key={symbol}
                name={stock.name}
                symbol={stock.symbol}
                price={price}
                change={change}
                negative={negative}
              />
            );
          })}
        </div>

        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-1 mt-10"
          onClick={() => {
            toast({
              title: "Watchlist Empty",
              description: "There's nothing to add yet. Try again later!",
            });
          }}
        >
          <Plus className="h-4 w-4" />
          Add to Watchlist
        </Button>
      </CardContent>
    </Card>
  );
};

const WatchlistItem = ({
  name,
  symbol,
  price,
  change,
  negative = false,
}: {
  name: string;
  symbol: string;
  price: string;
  change: string;
  negative?: boolean;
}) => (
  <div className="flex justify-between items-center">
    <div>
      <div className="font-medium">{name}</div>
      <div className="text-xs text-muted-foreground">{symbol}</div>
    </div>
    <div className="text-right">
      <div className="font-medium">{price}</div>
      <div
        className={`flex justify-end items-center text-xs gap-1 ${
          negative ? "text-red-600" : "text-green-600"
        }`}
      >
        {negative ? <ArrowDown className="h-3 w-3" /> : <ArrowUp className="h-3 w-3" />}
        {change}
      </div>
    </div>
  </div>
);

export default Watchlist;
