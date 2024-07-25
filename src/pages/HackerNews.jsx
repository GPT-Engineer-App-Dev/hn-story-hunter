import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const fetchHackerNewsStories = async () => {
  const response = await fetch(
    "https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=100"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch stories");
  }
  return response.json();
};

const HackerNews = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, error } = useQuery({
    queryKey: ["hackerNewsStories"],
    queryFn: fetchHackerNewsStories,
  });

  const filteredStories = data?.hits.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Top 100 Hacker News Stories</h1>
      <div className="mb-6 flex gap-4">
        <Input
          type="text"
          placeholder="Search stories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={() => setSearchTerm("")}>Clear</Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array.from({ length: 9 }).map((_, index) => (
              <Card key={index}>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-8 w-24" />
                </CardFooter>
              </Card>
            ))
          : filteredStories?.map((story) => (
              <Card key={story.objectID}>
                <CardHeader>
                  <CardTitle>{story.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Points: {story.points}</p>
                  <p>Author: {story.author}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild>
                    <a href={story.url} target="_blank" rel="noopener noreferrer">
                      Read More
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
      </div>
    </div>
  );
};

export default HackerNews;
