import React from "react";
import { HeaderTitle } from "@/components/general/header-title";

const Analytics = () => {
  return (
    <div className="flex w-full h-screen bg-background">
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <HeaderTitle
            title="Analytics"
            subtitle="View all your analytics here."
          />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
