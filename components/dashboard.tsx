"use client";

import type React from "react";
import Link from "next/link";
import { HeaderTitle } from "./general/header-title";
import Overview from "./dashboard/overview";
import Watchlist from "./dashboard/watchlist";
import { StockChart } from "./dashboard/chart";
import Stocks from "./dashboard/stocks";
import Crypto from "./dashboard/crypto";

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
            <Stocks />
            <Crypto />
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
