import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Eye, Scale, Coins } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const assets = [
  {
    name: "Apple Inc.",
    symbol: "AAPL",
    price: 218.27,
    change: 4.17,
  },
  {
    name: "Microsoft Corp.",
    symbol: "MSFT",
    price: 391.26,
    change: 4.42,
  },
  {
    name: "Alphabet Inc.",
    symbol: "GOOGL",
    price: 163.99,
    change: 1.19,
  },
];

const currencyRates: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.78,
};

const currencySymbols: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
};

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState("");
  const [currency, setCurrency] = useState("USD");

  const filteredAssets = assets.filter(
    (asset) =>
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
          {filteredAssets.map(({ name, symbol, price, change }) => {
            const convertedPrice = (price * currencyRates[currency]).toFixed(2);
            const formattedChange = change.toFixed(2);
            return (
              <div
                key={symbol}
                className="flex justify-between items-center p-2 border rounded-lg"
              >
                <div>
                  <div className="font-medium">{name}</div>
                  <div className="text-xs text-muted-foreground">{symbol}</div>
                  <div className="text-sm text-green-600">
                    {currencySymbols[currency]}
                    {convertedPrice}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>View Asset</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Scale className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Compare Asset</TooltipContent>
                  </Tooltip>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Coins className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Select Currency</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {Object.keys(currencyRates).map((curr) => (
                        <DropdownMenuItem
                          key={curr}
                          onClick={() => setCurrency(curr)}
                        >
                          {curr} ({currencySymbols[curr]})
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;
