import { Metadata } from "next";
import { config } from "../../config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  robots: "noindex"
};

export default function Page() {
  return (
    <div className="flex w-full flex-col items-start justify-center">
      <header className="flex-col md:flex-row flex text-center md:text-left items-center gap-10">
        <div className="flex-1">
          <h2 className="mb-4 text-5xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1] md:block">
            Privacy Policy
          </h2>
        </div>
      </header>
      <section className="relative my-16 md:my-16 w-full">
        <p>
          © {new Date().getFullYear()} {config.name}. All rights reserved.
        </p>
      </section>
    </div>
  );
}
