import { Link, useLocation } from "@tanstack/react-router";
import { useEffect } from "react";

export const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="text-center h-full flex-1 flex flex-col justify-center items-center">
      <h1 className="mb-4 text-5xl font-semibold">404</h1>
      <p className="mb-4 text-xl text-gray-600">Oops! Page not found</p>
      <Link to="/" className="text-blue-500 underline hover:text-blue-700">
        Return to Home
      </Link>
    </div>
  );
};
