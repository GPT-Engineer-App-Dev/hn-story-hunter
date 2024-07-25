import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Hacker News Top 100</h1>
        <p className="mb-6">Explore the top 100 stories from Hacker News</p>
        <Button asChild>
          <Link to="/hacker-news">Go to Hacker News</Link>
        </Button>
      </div>
    </div>
  );
};

export default Index;
