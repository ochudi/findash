import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/components/hooks/use-toast"

const Watchlist = () => {
  const { toast } = useToast();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Watchlist</CardTitle>
        <CardDescription>Track your favorite assets</CardDescription>
      </CardHeader>
      <CardContent className="m-1">
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

        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-1 mt-10"
          onClick={() => {
            toast({
              title: "Watchlist Empty",
              description: "There's nothing to add yet. Try again later!",
            });
          }}
        >
          <Plus className="h-4 w-4" />
          Add to Watchlist
        </Button>
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
        <div
          className={`text-xs ${negative ? "text-red-600" : "text-green-600"}`}
        >
          {change}
        </div>
      </div>
    </div>
  );
}

export default Watchlist;
