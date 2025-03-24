import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Scale } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const assets = [
  { name: "Apple Inc.", symbol: "AAPL", price: "$218.27", change: "+4.17000" },
  { name: "Microsoft Corp.", symbol: "MSFT", price: "$391.26", change: "+4.42001" },
  { name: "Alphabet Inc.", symbol: "GOOGL", price: "$163.99", change: "+1.19000" },
];

interface WatchlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WatchlistModal: React.FC<WatchlistModalProps> = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState("");
  
  const filteredAssets = assets.filter(asset =>
    asset.name.toLowerCase().includes(search.toLowerCase()) ||
    asset.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[400px] md:max-w-md rounded-xl">
        <DialogHeader>
          <DialogTitle>Search and Add to Watchlist</DialogTitle>
        </DialogHeader>
        <div className="relative mb-4">
          <Search className="absolute left-2 top-2.5 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search assets..."
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          {filteredAssets.map(({ name, symbol, price, change }) => (
            <div key={symbol} className="flex justify-between items-center p-2 border rounded-lg">
              <div>
                <div className="font-medium">{name}</div>
                <div className="text-xs text-muted-foreground">{symbol}</div>
                <div className="text-sm text-green-600">{price} ({Number(change).toFixed(2)})</div>
              </div>
              <div className="flex gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Add to Watchlist</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Scale className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Compare Asset</TooltipContent>
                </Tooltip>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WatchlistModal;
