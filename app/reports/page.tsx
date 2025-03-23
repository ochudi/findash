import React from "react";
import { HeaderTitle } from "@/components/general/header-title";

const Reports = () => {
  return (
    <div className="flex w-full h-screen bg-background">
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <HeaderTitle
            title="Reports"
            subtitle="View and generate financial reports."
          />
        </div>
      </div>
    </div>
  );
};

export default Reports;
