import Container from "components/layout/container";
import Button from "components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <Container>
      <div>
        <h2 className="font-bold text-3xl md:text-5xl tracking-tight mb-4">404 – Oops!</h2>
        <p className="text-primary-foreground/80 mb-8">Seems like you're lost.</p>
        <Button variant="ghost" asChild>
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </Container>
  );
}
