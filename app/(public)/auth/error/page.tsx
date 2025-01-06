import { Metadata } from "next";
import ErrorMessage from "./error-message";

export const metadata: Metadata = {
  title: "Auth Error",
  robots: "noindex"
};

export default function Page() {
  return (
    <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
      <h2 className="font-bold text-3xl md:text-5xl tracking-tight mb-4">500 – Oops!</h2>
      <ErrorMessage />
    </div>
  );
}
