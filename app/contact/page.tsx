import Heading from "components/heading";
import { Metadata } from "next";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact"
};

export default function Page() {
  return (
    <div className="w-full max-w-[900px] mx-auto">
      <header className="relative mb-4 md:mb-8">
        <Heading title="Contact" subtitle="Get in touch with us" />
      </header>
      <section className="relative w-full">
        <ContactForm />
      </section>
    </div>
  );
}
