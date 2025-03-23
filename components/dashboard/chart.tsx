"use client";

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

const chartData = [
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
];

const minPrice = Math.min(...chartData.map((d) => d.Price));
const yAxisMin = minPrice - 10;

const chartConfig = {
  desktop: {
    label: "Stock Price",
    color: "black",
  },
} satisfies ChartConfig;

export function StockChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Apple Inc</CardTitle>
        <CardDescription>
          Stock price trend for the last 12 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[260px] pr-10 mt-3">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <AreaChart
              data={chartData}
              margin={{ left: 12, right: 12, bottom: 20 }}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
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
