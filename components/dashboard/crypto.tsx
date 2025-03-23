import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { ArrowDown, ArrowUp } from "lucide-react";

const Crypto = () => {
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
              <th className="text-left p-3 font-medium">Name</th>
              <th className="text-left p-3 font-medium">Price</th>
              <th className="text-left p-3 font-medium">24h Change</th>
              <th className="text-left p-3 font-medium">Market Cap</th>
              <th className="text-left p-3 font-medium">Volume (24h)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <CryptoRow
              name="Bitcoin"
              symbol="BTC"
              price="$42,637.30"
              change="+2.14%"
              marketCap="$834.5B"
              volume="$28.9B"
            />
            <CryptoRow
              name="Ethereum"
              symbol="ETH"
              price="$2,274.16"
              change="+1.87%"
              marketCap="$273.2B"
              volume="$15.7B"
            />
            <CryptoRow
              name="Binance Coin"
              symbol="BNB"
              price="$307.42"
              change="-0.53%"
              marketCap="$47.3B"
              volume="$1.2B"
              negative
            />
            <CryptoRow
              name="Solana"
              symbol="SOL"
              price="$102.83"
              change="+4.62%"
              marketCap="$44.1B"
              volume="$3.8B"
            />
            <CryptoRow
              name="Cardano"
              symbol="ADA"
              price="$0.58"
              change="-1.24%"
              marketCap="$20.5B"
              volume="$0.9B"
              negative
            />
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
  negative = false,
}: {
  name: string;
  symbol: string;
  price: string;
  change: string;
  marketCap: string;
  volume: string;
  negative?: boolean;
}) => {
  return (
    <tr className="hover:bg-muted/50">
      <td className="p-3">
        <div className="font-medium w-[100px]">{name}</div>
        <div className="text-xs text-muted-foreground">{symbol}</div>
      </td>
      <td className="p-3 text-left">{price}</td>
      <td
        className={`py-5 flex gap-1 items-center text-left ${
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
      <td className="p-3 text-left">{marketCap}</td>
      <td className="p-3 text-left">{volume}</td>
    </tr>
  );
};

export default Crypto;
