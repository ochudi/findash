import { HeaderTitle } from "@/components/general/header-title";

const Stocks = () => {
  return (
    <div className="flex w-full h-screen bg-background">
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <HeaderTitle
            title="Stocks"
            subtitle="Real-time stock prices, trends, and market data."
          />
        </div>
      </div>
    </div>
  );
};

export default Stocks;
