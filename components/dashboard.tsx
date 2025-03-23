"use client";

import type React from "react";
import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HeaderTitle } from "./general/header-title";
import Overview from "./dashboard/overview";
import Watchlist from "./dashboard/watchlist";
import { StockChart } from "./dashboard/chart";

const Dashboard = () => {
  return (
    <div className="flex w-full h-screen bg-background">
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <HeaderTitle
            title="Financial Dashboard"
            subtitle="Track stocks and cryptocurrencies in real-time."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col md:col-span-2 gap-2">
              <Overview />
              <StockChart />
            </div>
            <Watchlist />
          </div>

          {/* Stocks Section */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-1">Stocks</h2>
            <p className="text-xs text-muted-foreground mb-4">
              Top performing stocks today
            </p>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-table-header text-xs">
                  <tr>
                    <th className="text-left p-3 font-medium">Name</th>
                    <th className="text-right p-3 font-medium">Price</th>
                    <th className="text-right p-3 font-medium">Change</th>
                    <th className="text-right p-3 font-medium">% Change</th>
                    <th className="text-right p-3 font-medium">Volume</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <StockRow
                    name="Apple Inc."
                    symbol="AAPL"
                    price="$197.57"
                    change="+$1.23"
                    percentChange="+0.63%"
                    volume="58.7M"
                  />
                  <StockRow
                    name="Microsoft Corporation"
                    symbol="MSFT"
                    price="$392.30"
                    change="+$3.45"
                    percentChange="+0.89%"
                    volume="23.4M"
                  />
                  <StockRow
                    name="Alphabet Inc."
                    symbol="GOOGL"
                    price="$187.57"
                    change="-$0.89"
                    percentChange="-0.47%"
                    volume="19.2M"
                    negative
                  />
                  <StockRow
                    name="Amazon.com, Inc."
                    symbol="AMZN"
                    price="$153.42"
                    change="+$2.31"
                    percentChange="+1.53%"
                    volume="32.1M"
                  />
                  <StockRow
                    name="Tesla, Inc."
                    symbol="TSLA"
                    price="$238.83"
                    change="-$3.76"
                    percentChange="-1.55%"
                    volume="94.3M"
                    negative
                  />
                </tbody>
              </table>
            </div>
          </div>

          {/* Cryptocurrencies Section */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-1">Cryptocurrencies</h2>
            <p className="text-xs text-muted-foreground mb-4">
              Top cryptocurrencies by market cap
            </p>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-table-header text-xs">
                  <tr>
                    <th className="text-left p-3 font-medium">Name</th>
                    <th className="text-right p-3 font-medium">Price</th>
                    <th className="text-right p-3 font-medium">24h Change</th>
                    <th className="text-right p-3 font-medium">Market Cap</th>
                    <th className="text-right p-3 font-medium">Volume (24h)</th>
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
          </div>

          {/* Market News Section */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-1">Market News</h2>
            <p className="text-xs text-muted-foreground mb-4">
              Latest financial news and updates
            </p>

            <div className="space-y-4">
              <NewsItem
                title="Fed Signals Potential Rate Cuts in 2024 as Inflation Cools"
                source="Financial Times"
                time="2 hours ago"
                category="Economy"
              />
              <NewsItem
                title="Apple Unveils New AI Features for iPhone and Mac"
                source="TechCrunch"
                time="4 hours ago"
                category="Technology"
              />
              <NewsItem
                title="Bitcoin Surges Past $42,000 as Institutional Adoption Grows"
                source="CoinDesk"
                time="6 hours ago"
                category="Cryptocurrency"
              />
              <NewsItem
                title="Tesla Announces New Gigafactory in Asia, Shares Jump 3%"
                source="Reuters"
                time="8 hours ago"
                category="Automotive"
              />
              <NewsItem
                title="Oil Prices Fall on Concerns About Global Demand"
                source="Bloomberg"
                time="10 hours ago"
                category="Commodities"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function NavItem({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href="#"
      className={`flex items-center gap-3 px-3 py-2 text-sm rounded-md mb-1 ${
        active
          ? "bg-sidebar-active font-medium"
          : "text-muted-foreground hover:bg-muted"
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}

function StockRow({
  name,
  symbol,
  price,
  change,
  percentChange,
  volume,
  negative = false,
}: {
  name: string;
  symbol: string;
  price: string;
  change: string;
  percentChange: string;
  volume: string;
  negative?: boolean;
}) {
  return (
    <tr className="hover:bg-muted/50">
      <td className="p-3">
        <div className="font-medium">{name}</div>
        <div className="text-xs text-muted-foreground">{symbol}</div>
      </td>
      <td className="p-3 text-right">{price}</td>
      <td
        className={`p-3 text-right ${
          negative ? "text-danger" : "text-success"
        }`}
      >
        {change}
      </td>
      <td
        className={`p-3 text-right ${
          negative ? "text-danger" : "text-success"
        }`}
      >
        {percentChange}
      </td>
      <td className="p-3 text-right">{volume}</td>
    </tr>
  );
}

function CryptoRow({
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
}) {
  return (
    <tr className="hover:bg-muted/50">
      <td className="p-3">
        <div className="font-medium">{name}</div>
        <div className="text-xs text-muted-foreground">{symbol}</div>
      </td>
      <td className="p-3 text-right">{price}</td>
      <td
        className={`p-3 text-right ${
          negative ? "text-danger" : "text-success"
        }`}
      >
        {change}
      </td>
      <td className="p-3 text-right">{marketCap}</td>
      <td className="p-3 text-right">{volume}</td>
    </tr>
  );
}

function NewsItem({
  title,
  source,
  time,
  category,
}: {
  title: string;
  source: string;
  time: string;
  category: string;
}) {
  return (
    <div className="border-b border-border pb-4">
      <h3 className="font-medium mb-1">{title}</h3>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>{source}</span>
        <span>•</span>
        <span>{time}</span>
        <span>•</span>
        <span>{category}</span>
      </div>
    </div>
  );
}

export default Dashboard;
