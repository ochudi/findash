"use client";

import useSWR from "swr";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowDown, ArrowUp } from "lucide-react";

// Reuse your existing UI components for table rendering
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Crypto = () => {
  const { data, error } = useSWR("/api/coins", fetcher);

  if (error) return <div>Error loading data.</div>;
  if (!data) return <div>Loading...</div>;

  // Assuming the API returns data.data.coins as an array of coin objects
  const coins = data.data.coins;

  return (
    <Card className="md:col-span-3">
      <CardHeader>
        <CardTitle>Cryptocurrencies</CardTitle>
        <CardDescription>Top cryptocurrencies by market cap</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-table-header text-xs">
              <tr>
                {[
                  "Name",
                  "Price",
                  "24h Change",
                  "Market Cap",
                  "Volume (24h)",
                ].map((header) => (
                  <th
                    key={header}
                    className="text-left p-3 font-medium text-nowrap"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {coins.map((coin: any) => (
                <CryptoRow
                  key={coin.uuid}
                  name={coin.name}
                  symbol={coin.symbol}
                  price={`$${Number(coin.price).toFixed(2)}`}
                  change={`${Number(coin.change).toFixed(2)}%`}
                  marketCap={`$${(Number(coin.marketCap) / 1e9).toFixed(1)}B`}
                  volume={`${
                    !isNaN(Number(coin["24hVolume"]))
                      ? (Number(coin["24hVolume"]) / 1e9).toFixed(1) + "B"
                      : "N/A"
                  }`}
                  negative={Number(coin.change) < 0}
                />
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

const CryptoRow = ({
  name,
  symbol,
  price,
  change,
  marketCap,
  volume,
  negative,
}: {
  name: string;
  symbol: string;
  price: string;
  change: string;
  marketCap: string;
  volume: string;
  negative: boolean;
}) => {
  return (
    <tr className="hover:bg-muted/50 text-nowrap">
      <td className="p-3">
        <div className="font-medium">{name}</div>
        <div className="text-xs text-muted-foreground">{symbol}</div>
      </td>
      <td className="p-3">{price}</td>
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
        {change}
      </td>
      <td className="p-3">{marketCap}</td>
      <td className="p-3">{volume}</td>
    </tr>
  );
};

export default Crypto;
