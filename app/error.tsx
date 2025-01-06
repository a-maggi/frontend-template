"use client";
import Button from "components/ui/button";
import Link from "next/link";
import Container from "components/layout/container";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Container>
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4">500 – Oops!</h1>
        <p className="text-gray-400 mb-8">Something went wrong. Please try again in a few minutes.</p>
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
          <Button variant="ghost" asChild>
            <Link href="/">Go back to home</Link>
          </Button>
          <Button onClick={() => reset()}>Try again</Button>
        </div>
      </div>
    </Container>
  );
}
