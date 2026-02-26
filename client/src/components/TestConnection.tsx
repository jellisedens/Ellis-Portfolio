import { useState, useEffect } from "react";
import { getTest } from "../services/api";

/*
  This component demonstrates the core data-fetching pattern
  you'll use throughout the app:

  1. Three state variables: data, loading, error
  2. useEffect triggers the fetch on mount
  3. Conditional rendering shows the right UI for each state

  Every component that fetches data will follow this same
  shape. Later we could extract this into a custom hook
  (useApi or useFetch) to avoid repeating the pattern.
*/

function TestConnection() {
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    getTest()
      .then((data) => {
        setMessage(data.message || "Connected successfully");
      })
      .catch((err) => {
        setError(err.message || "Failed to connect");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="rounded-lg border border-secondary/20 p-6 text-center">
        <p className="text-text-muted">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-300 bg-red-50 p-6 text-center">
        <p className="font-medium text-red-600">Error</p>
        <p className="mt-1 text-sm text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-green-300 bg-green-50 p-6 text-center">
      <p className="font-medium text-green-600">Connection Successful</p>
      <p className="mt-1 text-sm text-green-500">{message}</p>
    </div>
  );
}

export default TestConnection;