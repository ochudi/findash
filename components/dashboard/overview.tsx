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
import { ArrowDown, ArrowUp } from "lucide-react";
import { toast } from "sonner";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Overview = () => {
  // Fetch stock and crypto data using SWR
  const { data: stockData, error: stockError } = useSWR("/api/stocks", fetcher);
  const { data: cryptoData, error: cryptoError } = useSWR(
    "/api/coins",
    fetcher
  );

  useEffect(() => {
    if (stockError || cryptoError) {
      toast.error("Failed to fetch market data. Some data may be outdated.");
    }
  }, [stockError, cryptoError]);

  if (!stockData || !cryptoData) return <div>Loading...</div>;

  // Process stocks: stockData is assumed to be an object keyed by symbol.
  const stockKeys = Object.keys(stockData);
  const first3Stocks = stockKeys.slice(0, 3).map((key) => stockData[key]);
  const formattedStocks = first3Stocks.map((stock: any) => ({
    name: stock.name,
    value: stock.close ? `$${Number(stock.close).toFixed(2)}` : "N/A",
    change: stock.percent_change
      ? Number(stock.percent_change) >= 0
        ? `+${stock.percent_change}%`
        : `${stock.percent_change}%`
      : "N/A",
    negative: Number(stock.percent_change) < 0,
  }));

  // Process cryptocurrencies: cryptoData.data.coins is an array.
  const coins = cryptoData.data.coins || [];
  const first3Cryptos = coins.slice(0, 3);
  const formattedCryptos = first3Cryptos.map((coin: any) => ({
    name: coin.name,
    value: coin.price ? `$${Number(coin.price).toFixed(2)}` : "N/A",
    change: coin.change
      ? Number(coin.change) >= 0
        ? `+${coin.change}%`
        : `${coin.change}%`
      : "N/A",
    negative: Number(coin.change) < 0,
  }));

  // Combine the two arrays
  const indicesData = [...formattedStocks, ...formattedCryptos];

  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle>Market Overview</CardTitle>
        <CardDescription>Live market indices and commodities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          {indicesData.map(({ name, value, change, negative }, index) => (
            <MarketIndex
              key={index}
              name={name}
              value={value}
              change={change}
              negative={negative}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const MarketIndex = ({
  name,
  value,
  change,
  negative = false,
}: {
  name: string;
  value: string;
  change: string;
  negative?: boolean;
}) => (
  <div className="space-y-1">
    <div className="text-sm text-muted-foreground">{name}</div>
    <div className="font-bold text-lg">{value}</div>
    <div
      className={`text-xs flex items-center gap-1 ${
        negative ? "text-red-600" : "text-green-600"
      }`}
    >
      {negative ? (
        <ArrowDown className="h-3 w-3" />
      ) : (
        <ArrowUp className="h-3 w-3" />
      )}
      {change}
    </div>
  </div>
);

export default Overview;
