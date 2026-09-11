"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="container mx-auto px-4 py-12 sm:px-6 md:px-8 flex items-center justify-center min-h-screen">
      <div className="max-w-2xl space-y-6 text-center">
        <h1 className="text-3xl font-semibold">Something went wrong</h1>
        <p className="text-muted-foreground text-lg">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center justify-center rounded-full font-medium transition-colors bg-foreground text-background hover:bg-muted-foreground h-10 px-8 text-sm uppercase tracking-[0.2rem]"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
