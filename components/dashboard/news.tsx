import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const ITEMS_PER_PAGE = 5;

const News = () => {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("/api/news");
        if (!res.ok) throw new Error("Failed to fetch news");
        const data = await res.json();
        setNews(data);
      } catch (err) {
        setError("Error loading news.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Pagination Logic
  const totalPages = Math.ceil(news.length / ITEMS_PER_PAGE);
  const paginatedNews = news.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <Card className="md:col-span-3 mb-10">
      <CardHeader>
        <CardTitle>Market News</CardTitle>
        <CardDescription>Latest financial news and updates</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <NewsSkeleton />
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <div className="space-y-4">
              {paginatedNews.map((item, index) => (
                <NewsItem
                  key={index}
                  title={item.title}
                  source={item.source}
                  time={item.time}
                  category={item.category}
                  url={item.url}
                />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center md:justify-start gap-5 mt-6">
                <Button
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

interface NewsItemProps {
  title: string;
  source: string;
  time: string;
  category: string;
  url: string;
}

// Function to format date as "X days ago"
const formatTimeAgo = (time?: string) => {
  if (!time || time.length < 15) return "Unknown";

  const year = parseInt(time.slice(0, 4));
  const month = parseInt(time.slice(4, 6)) - 1;
  const day = parseInt(time.slice(6, 8));
  const hours = parseInt(time.slice(9, 11));
  const minutes = parseInt(time.slice(11, 13));

  const publishedDate = new Date(year, month, day, hours, minutes);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - publishedDate.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hour(s) ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} day(s) ago`;
};

const NewsItem = ({ title, source, time, category, url }: NewsItemProps) => (
  <div className="border-b border-border pb-4">
    <h3 className="text-md font-semibold mb-1">
      <a href={url} target="_blank" rel="noopener noreferrer" className="hover:underline">
        {title}
      </a>
    </h3>
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <span>{source}</span>
      <span>•</span>
      <span>{formatTimeAgo(time)}</span>
      <span>•</span>
      <Badge variant="secondary" className="font-normal text-xs text-muted-foreground">
        {category === "n/a" ? "News" : category}
      </Badge>
    </div>
  </div>
);

const NewsSkeleton = () => (
  <div className="space-y-4">
    {Array.from({ length: 5 }).map((_, index) => (
      <div key={index} className="border-b border-border pb-4 space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    ))}
  </div>
);

export default News;
