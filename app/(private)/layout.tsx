import "styles/global.css";
import { getServerSession } from "next-auth";
import { authOptions } from "lib/authOptions";
import Container from "components/layout/container";
import { SidebarProvider } from "components/ui/sidebar";
import { redirect } from "next/navigation";

export type LayoutProps = {
  children: React.ReactNode;
};

export default async function Layout({ children }: LayoutProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    // redirect to login
    redirect("/auth/signin");
  }

  return (
    <SidebarProvider>
      <section className="h-screen w-full">
        <Container session={session}>{children}</Container>
      </section>
    </SidebarProvider>
  );
}
