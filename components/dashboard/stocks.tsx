import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Stocks = () => {
  return (
    <Card className="md:col-span-3">
      <CardHeader>
        <CardTitle>Stocks</CardTitle>
        <CardDescription>Top performing stocks today</CardDescription>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
};

const StockRow = ({
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
}) => {
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
};

export default Stocks;
