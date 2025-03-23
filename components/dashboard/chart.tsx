"use client";

import { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";

const stockData = {
  AAPL: {
    title: "Apple Inc",
    lastPrice: 287.92,
    change: 1.23,
    percentChange: 10.63,
    data: [
      { month: "Jan", Price: 186 },
      { month: "Feb", Price: 205 },
      { month: "Mar", Price: 237 },
      { month: "Apr", Price: 180 },
      { month: "May", Price: 209 },
      { month: "Jun", Price: 214 },
      { month: "Jul", Price: 230 },
      { month: "Aug", Price: 190 },
      { month: "Sep", Price: 250 },
      { month: "Oct", Price: 260 },
      { month: "Nov", Price: 270 },
      { month: "Dec", Price: 280 },
    ],
  },
  MSFT: {
    title: "Microsoft Corp",
    lastPrice: 325.62,
    change: -2.23,
    percentChange: 2.63,
    data: [
      { month: "Jan", Price: 250 },
      { month: "Feb", Price: 265 },
      { month: "Mar", Price: 280 },
      { month: "Apr", Price: 275 },
      { month: "May", Price: 290 },
      { month: "Jun", Price: 310 },
      { month: "Jul", Price: 320 },
      { month: "Aug", Price: 330 },
      { month: "Sep", Price: 310 },
      { month: "Oct", Price: 300 },
      { month: "Nov", Price: 315 },
      { month: "Dec", Price: 325 },
    ],
  },
  GOOGL: {
    title: "Alphabet Inc",
    lastPrice: 197.57,
    change: 1.23,
    percentChange: 0.63,
    data: [
      { month: "Jan", Price: 140 },
      { month: "Feb", Price: 150 },
      { month: "Mar", Price: 160 },
      { month: "Apr", Price: 155 },
      { month: "May", Price: 165 },
      { month: "Jun", Price: 175 },
      { month: "Jul", Price: 185 },
      { month: "Aug", Price: 195 },
      { month: "Sep", Price: 205 },
      { month: "Oct", Price: 215 },
      { month: "Nov", Price: 225 },
      { month: "Dec", Price: 235 },
    ],
  },
};

const chartConfig = {
  desktop: {
    label: "Stock Price",
    color: "black",
  },
} satisfies ChartConfig;

export function StockChart() {
  const [selectedStock, setSelectedStock] =
    useState<keyof typeof stockData>("AAPL");

  const stock = stockData[selectedStock];
  const minPrice = Math.min(...stock.data.map((d) => d.Price));
  const yAxisMin = minPrice - 10;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center flex-col gap-2 lg:flex-row">
          <div className="flex flex-col gap-1">
            <CardTitle>{stock.title}</CardTitle>
            <CardDescription>
              <div className="flex items-center gap-2">
                <div className="text-lg">${stock.lastPrice}</div>
                <span
                  className={`text-sm ${
                    stock.change >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stock.change >= 0 ? `+${stock.change}` : stock.change}
                </span>
                <span
                  className={`text-sm ${
                    stock.percentChange >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  (
                  {stock.percentChange >= 0
                    ? `+${stock.percentChange}`
                    : stock.percentChange}
                  %)
                </span>
              </div>
            </CardDescription>
          </div>
          <div className="flex space-x-1 border p-1 rounded-lg bg-gray-100">
            {Object.keys(stockData).map((key) => (
              <Button
                key={key}
                variant={selectedStock === key ? "outline" : "secondary"}
                onClick={() => setSelectedStock(key as keyof typeof stockData)}
                className="hover:bg-white px-2 py-1"
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
          <ChartContainer config={chartConfig} className="h-full w-full">
            <AreaChart
              data={stock.data}
              margin={{ left: -20, right: 20, bottom: 20 }}
            >
              <CartesianGrid vertical={true} strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                domain={[yAxisMin, "auto"]}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <defs>
                <linearGradient id="fillBlack" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="black" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="black" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <Area
                dataKey="Price"
                type="monotone"
                stroke="black"
                fill="url(#fillBlack)"
                fillOpacity={0.4}
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
