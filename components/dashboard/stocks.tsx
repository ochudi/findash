"use client";

import { useEffect } from "react";
import useSWR from "swr";
import { useToast } from "@/components/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowDown, ArrowUp } from "lucide-react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Stocks = () => {
  const { toast } = useToast();
  const { data, error } = useSWR("/api/stocks", fetcher, {
    revalidateOnFocus: false,
  });

  // Transform API response from object to array
  const stocks = data ? Object.values(data) : [];

  // Single useEffect to handle errors and empty data
  useEffect(() => {
    if (error) {
      toast({
        title: "API Error",
        description: "The stock data API appears to be down. Please try again later.",
        variant: "destructive",
      });
    } else if (stocks.length === 0 && data) {
      toast({
        title: "No Stock Data",
        description: "No stock data available. Please try again later.",
        variant: "destructive",
      });
    }
  }, [error, stocks.length, data, toast]);

  if (!data && error) return <div>Error loading stock data.</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <Card className="md:col-span-3">
      <CardHeader>
        <CardTitle>Stocks</CardTitle>
        <CardDescription>Top performing stocks today</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-table-header text-xs">
              <tr>
                {["Name", "Price", "Change", "% Change", "Volume"].map(
                  (header) => (
                    <th
                      key={header}
                      className="text-left p-3 font-medium whitespace-nowrap"
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {stocks.map((stock: any) => (
                <StockRow
                  key={stock.symbol}
                  name={stock.name || "N/A"}
                  symbol={stock.symbol || "N/A"}
                  price={
                    stock.close
                      ? `$${Number(stock.close).toFixed(2)}`
                      : "N/A"
                  }
                  change={
                    stock.change
                      ? stock.change.startsWith("-")
                        ? stock.change
                        : `+${stock.change}`
                      : "N/A"
                  }
                  percentChange={
                    stock.percent_change
                      ? stock.percent_change.startsWith("-")
                        ? stock.percent_change
                        : `+${stock.percent_change}`
                      : "N/A"
                  }
                  volume={
                    stock.volume && !isNaN(Number(stock.volume))
                      ? `${(Number(stock.volume) / 1e6).toFixed(1)}M`
                      : "N/A"
                  }
                  negative={Number(stock.change) < 0}
                />
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

const StockRow = ({
  name,
  symbol,
  price,
  change,
  percentChange,
  volume,
  negative,
}: {
  name: string;
  symbol: string;
  price: string;
  change: string;
  percentChange: string;
  volume: string;
  negative: boolean;
}) => {
  return (
    <tr className="hover:bg-muted/50">
      <td className="p-3">
        <div className="font-medium">{name}</div>
        <div className="text-xs text-muted-foreground">{symbol}</div>
      </td>
      <td className="p-3">{price}</td>
      <td className={`p-3 ${negative ? "text-red-600" : "text-green-600"}`}>
        {change}
      </td>
      <td
        className={`p-3 flex items-center gap-1 ${
          negative ? "text-red-600" : "text-green-600"
        }`}
      >
        {negative ? (
          <ArrowDown className="h-3 w-3" />
        ) : (
          <ArrowUp className="h-3 w-3" />
        )}
        {percentChange}
      </td>
      <td className="p-3">{volume}</td>
    </tr>
  );
};

export default Stocks;
