import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowDown, ArrowUp } from "lucide-react";

const Overview = () => {
  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle>Market Overview</CardTitle>
        <CardDescription>Live market indices and commodities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          <MarketIndex name="S&P 500" value="4,587.64" change="+0.83%" />
          <MarketIndex name="Dow Jones" value="37,306.02" change="+0.86%" />
          <MarketIndex
            name="Nasdaq"
            value="14,403.97"
            change="-0.23%"
            negative
          />
          <MarketIndex name="Bitcoin" value="$42,637.30" change="+2.14%" />
          <MarketIndex name="Ethereum" value="$2,274.16" change="+1.87%" />
          <MarketIndex name="Gold" value="$2,032.30" change="-0.12%" negative />
        </div>
      </CardContent>
    </Card>
  );
};

function MarketIndex({
  name,
  value,
  change,
  negative = false,
}: {
  name: string;
  value: string;
  change: string;
  negative?: boolean;
}) {
  return (
    <div className="space-y-1">
      <div className="text-s text-muted-foreground">{name}</div>
      <div className="font-bold text-lg">{value}</div>
      <div
        className={`text-xs flex items-center ${
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
}

export default Overview;
