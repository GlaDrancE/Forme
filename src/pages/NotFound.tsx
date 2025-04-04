
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex flex-1 items-center justify-center flex-col p-6 text-center">
        <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
        <p className="text-2xl font-medium mb-6">Oops! Page not found</p>
        <p className="text-muted-foreground max-w-md mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Button size="lg" asChild>
          <Link to="/">Back to Homepage</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
