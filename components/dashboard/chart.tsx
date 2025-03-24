"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import { useTheme } from "next-themes";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { useToast } from "../hooks/use-toast";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function StockChart() {
  const { data, error } = useSWR("/api/stocks", fetcher);
  const { theme } = useTheme();
  const [selectedStock, setSelectedStock] = useState<string>("");
  const { toast } = useToast();

  // Handle API errors
  useEffect(() => {
    if (error) {
      toast({
        title: "API Error",
        description: "The stock data API appears to be down. Please try again later.",
        variant: "destructive",
      });
    }
  }, [error]);

  // Keep stocks as an object, and filter to only the first 3 keys
  const stocks = data || {}; // Data is expected to be an object keyed by stock symbol
  const allKeys = Object.keys(stocks);
  const filteredKeys = allKeys.slice(0, 3);

  // On first render or if selectedStock isn't in our allowed list, default to first key
  useEffect(() => {
    if (filteredKeys.length > 0 && !filteredKeys.includes(selectedStock)) {
      setSelectedStock(filteredKeys[0]);
    }
  }, [filteredKeys, selectedStock]);

  const stock = stocks[selectedStock] || null;

  if (!stock) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Stock Data</CardTitle>
          <CardDescription>Unable to fetch stock prices.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">Please try again later.</p>
        </CardContent>
      </Card>
    );
  }

  // Transform data for the chart (using four data points from the stock)
  const chartData = [
    { month: "Jan", Price: Number(stock.open) },
    { month: "Feb", Price: Number(stock.high) },
    { month: "Mar", Price: Number(stock.low) },
    { month: "Apr", Price: Number(stock.close) },
  ];
  const yAxisMin = Math.min(...chartData.map((d) => d.Price)) - 10;

  // Theme-based styling
  const strokeColor = theme === "dark" ? "white" : "black";
  const gradientStopOpacityHigh = theme === "dark" ? 0.8 : 0.8;
  const gradientStopOpacityLow = theme === "dark" ? 0.1 : 0.1;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center flex-col gap-2 lg:flex-row">
          <div className="flex flex-col gap-1">
            <CardTitle>{stock.name}</CardTitle>
            <CardDescription>
              <div className="flex items-center gap-2">
                <div className="text-lg">${stock.close}</div>
                <span
                  className={`text-sm ${
                    Number(stock.change) >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {Number(stock.change) >= 0
                    ? `+${stock.change}`
                    : stock.change}
                </span>
                <span
                  className={`text-sm ${
                    Number(stock.percent_change) >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  (
                  {Number(stock.percent_change) >= 0
                    ? `+${stock.percent_change}`
                    : stock.percent_change}
                  %)
                </span>
              </div>
            </CardDescription>
          </div>
          <div className="flex space-x-1 border p-1 rounded-lg bg-gray-100 dark:bg-gray-800">
            {filteredKeys.map((key) => (
              <Button
                key={key}
                variant={selectedStock === key ? "outline" : "secondary"}
                onClick={() => setSelectedStock(key)}
                className="hover:bg-white dark:hover:bg-gray-700 px-2 py-1"
                size="sm"
              >
                {key}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[260px] mt-3">
          <ChartContainer
            config={{ desktop: { label: "Stock Price" } }}
            className="h-full w-full"
          >
            <AreaChart data={chartData} margin={{ left: -20, right: 20, bottom: 20 }}>
              <CartesianGrid vertical={true} strokeDasharray="3 3" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} domain={[yAxisMin, "auto"]} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <defs>
                <linearGradient id="fillBlack" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={strokeColor} stopOpacity={gradientStopOpacityHigh} />
                  <stop offset="95%" stopColor={strokeColor} stopOpacity={gradientStopOpacityLow} />
                </linearGradient>
              </defs>
              <Area dataKey="Price" type="monotone" stroke={strokeColor} fill="url(#fillBlack)" fillOpacity={0.4} />
            </AreaChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
