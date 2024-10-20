import React from "react";
import Footer from "components/layout/footer";
import AuthDialog from "../auth-dialog";
import UserDropdown from "../user-dropdown";
import SearchInput from "./search-input";
import { Session } from "next-auth";
import { MainNavigation } from "./navigation-menu";
import { cn } from "lib/utils";

export type ContainerRoot = {
  children: React.ReactNode;
  session?: Session | null;
  fullWith?: boolean;
};

function Container({ children, session, fullWith }: ContainerRoot) {
  return (
    <React.Fragment>
      <nav className="w-full pointer-events-auto">
        <div className="container mx-auto flex max-w-6xl items-center justify-between gap-4 py-2">
          <div className="flex items-center gap-4">
            <MainNavigation isLoggedIn={Boolean(session?.user)} />
          </div>
          {session?.user ? (
            <>
              <div className="flex items-center gap-4">
                <div className="hidden md:flex max-w-sm flex-grow">
                  <SearchInput />
                </div>
                <UserDropdown user={session.user} />
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex max-w-sm flex-grow">
                <SearchInput />
              </div>
              <AuthDialog />
            </div>
          )}
        </div>
      </nav>
      <main className="w-full py-8 md:py-12">
        <div className={cn("container mx-auto flex justify-center", { "max-w-6xl": !fullWith })}>{children}</div>
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default Container;
