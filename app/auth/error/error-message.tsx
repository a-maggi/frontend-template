"use client";
import Button from "components/form-elements/button";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

function friendlyError(error: string) {
  switch (error) {
    case "Configuration":
      return "There was a problem with the configuration of your account. Please try again later.";
    case "Verification":
      return "There was a problem verifying your account. Please try again later.";
    case "AccessDenied":
      return "Not authorized";
    default:
      return "Something went wrong. Please try again later.";
  }
}

const ErrorMessage = () => {
  const router = useRouter();
  const query = useSearchParams();
  const error = friendlyError(query?.get("error") || "");
  return (
    <>
      <p className="text-gray-400 mb-8">{error}</p>
      <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
        <Button variant="ghost" asChild>
          <Link href="/">Go back</Link>
        </Button>
        <Button onClick={() => router.refresh()}>Try again</Button>
      </div>
    </>
  );
};

export default ErrorMessage;
