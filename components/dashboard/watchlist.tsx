import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Watchlist = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Watchlist</CardTitle>
        <p className="text-xs text-muted-foreground">
          Track your favorite assets
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <WatchlistItem
            name="Apple Inc."
            symbol="AAPL"
            price="$197.57"
            change="+0.63%"
          />
          <WatchlistItem
            name="Tesla, Inc."
            symbol="TSLA"
            price="$238.83"
            change="-1.55%"
            negative
          />
          <WatchlistItem
            name="Bitcoin"
            symbol="BTC"
            price="$42,637.30"
            change="+2.14%"
          />
          <WatchlistItem
            name="Ethereum"
            symbol="ETH"
            price="$2,274.16"
            change="+1.87%"
          />
          <WatchlistItem
            name="Amazon.com, Inc."
            symbol="AMZN"
            price="$153.42"
            change="+1.53%"
          />

        </div>
      </CardContent>
    </Card>
  );
};

function WatchlistItem({
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
}) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <div className="font-medium">{name}</div>
        <div className="text-xs text-muted-foreground">{symbol}</div>
      </div>
      <div className="text-right">
        <div className="font-medium">{price}</div>
        <div className={`text-xs ${negative ? "text-danger" : "text-success"}`}>
          {change}
        </div>
      </div>
    </div>
  );
}

export default Watchlist;
