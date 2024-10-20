import Separator from "components/ui/separator";
import Nav from "./components/nav";

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function AccountLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="relative w-full">
      <header className="space-y-0.5">
        <h2 className="text-2xl text-primary-foreground font-bold">Configuración</h2>
        <p className="text-muted-foreground">Gestiona tu cuenta y preferencias de usuario.</p>
      </header>
      <Separator className="my-6" />
      <section className="relative w-full">
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <Nav />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </section>
    </div>
  );
}
