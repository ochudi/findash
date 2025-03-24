"use client";

import { StockChart } from "@/components/dashboard/chart";
import Overview from "@/components/dashboard/overview";
import Watchlist from "@/components/dashboard/watchlist";
import { HeaderTitle } from "@/components/general/header-title";
import type React from "react";
import Crypto from "@/components/dashboard/crypto";
import Stocks from "@/components/dashboard/stocks";
import News from "@/components/dashboard/news";

export default function Home() {
  return (
    <div className="flex w-full h-screen bg-background">
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <HeaderTitle
            title="Financial Dashboard"
            subtitle="Track stocks and cryptocurrencies."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col md:col-span-2 gap-2">
              <Overview />
              <StockChart />
            </div>
            <Watchlist />
            <Stocks />
            <Crypto />
            <News />
          </div>
        </div>
      </div>
    </div>
  );
}
