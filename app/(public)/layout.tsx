import "styles/global.css";
import { getServerSession } from "next-auth";
import { authOptions } from "lib/authOptions";
import Container from "components/layout/container";
import { redirect } from "next/navigation";

export type LayoutProps = {
  children: React.ReactNode;
};

export default async function Layout({ children }: LayoutProps) {
  const session = await getServerSession(authOptions);

  if (session) {
    // redirect to login
    redirect("/");
  }

  return (
    <section className="h-screen w-full">
      <Container>{children}</Container>
      {/* {session && <WelcomeDialog session={session} />} */}
    </section>
  );
}
