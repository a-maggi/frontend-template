"use client";
import Button from "components/form-elements/button";
import Link from "next/link";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
      <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4">500 – Oops!</h1>
      <p className="text-gray-400 mb-8">Algo salió mal. Por favor, intenta nuevamente en unos minutos.</p>
      <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
        <Button variant="ghost" asChild>
          <Link href="/">Volver al inicio</Link>
        </Button>
        <Button onClick={() => reset()}>Reintentar</Button>
      </div>
    </div>
  );
}
