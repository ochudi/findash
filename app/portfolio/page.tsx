import { HeaderTitle } from "@/components/general/header-title";

const Portfolio = () => {
  return (
    <div className="flex w-full h-screen bg-background">
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <HeaderTitle
            title="Portfolio"
            subtitle="Your investment portfolio at a glance."
          />
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
