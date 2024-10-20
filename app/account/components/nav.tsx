"use client";
import { buttonVariants } from "components/form-elements/button";
import { cn } from "lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Nav = () => {
  const pathname = usePathname();
  return (
    <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
      <Link
        href="/account"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          pathname === "/account" ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline",
          "justify-start"
        )}
      >
        Cuenta
      </Link>
      <Link
        href="/account/issuers"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          pathname === "/account/issuers" ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline",
          "justify-start"
        )}
      >
        Tarjetas
      </Link>
    </nav>
  );
};

export default Nav;
