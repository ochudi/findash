import { HeaderTitle } from "@/components/general/header-title";

const Cryptocurrencies = () => {
  return (
    <div className="flex w-full h-screen bg-background">
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <HeaderTitle
            title="Cryptocurrencies"
            subtitle="Real-time cryptocurrency prices and market data."
          />
        </div>
      </div>
    </div>
  );
};

export default Cryptocurrencies;
