import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"

const News = () => {
  return (
    <Card className="md:col-span-3 mb-10">
      <CardHeader>
        <CardTitle>Market News</CardTitle>
        <CardDescription>Latest financial news and updates</CardDescription>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
};

const NewsItem = ({
  title,
  source,
  time,
  category,
}: {
  title: string;
  source: string;
  time: string;
  category: string;
}) => {
  return (
    <div className="border-b border-border pb-4">
      <h3 className="text-md font-semibold mb-1">{title}</h3>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>{source}</span>
        <span>•</span>
        <span>{time}</span>
        <span>•</span>
        <Badge variant="secondary" className="font-normal text-xs text-muted-foreground">{category}</Badge>
      </div>
    </div>
  );
};

export default News;
