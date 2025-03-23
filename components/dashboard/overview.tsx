import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { StockChart } from "./chart";

const Overview = () => {
  return (
    <Card className="md:col-span-2">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Market Overview</CardTitle>
        <p className="text-xs text-muted-foreground">
          Live market indices and commodities
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
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
      <div className="text-xs text-muted-foreground">{name}</div>
      <div className="font-medium">{value}</div>
      <div
        className={`text-xs flex items-center ${
          negative ? "text-danger" : "text-success"
        }`}
      >
        {negative ? (
          <ChevronDown className="h-3 w-3" />
        ) : (
          <ChevronUp className="h-3 w-3" />
        )}
        {change}
      </div>
    </div>
  );
}

export default Overview;
