"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from "components/ui/navigation-menu";
import Button from "components/ui/button";
import { RxCross2 } from "react-icons/rx";
import { usePathname } from "next/navigation";
import { BiMenu } from "react-icons/bi";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import SearchInput from "./search-input";
import { config } from "../../config";

export function MainNavigation({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [open, setOpen] = useState(false);
  const pathName = usePathname();

  React.useEffect(() => {
    // block scroll when the menu is open
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // if route change, close the menu
  React.useEffect(() => {
    setOpen(false);
  }, [pathName]);

  const variants = {
    hidden: { opacity: 0, scale: 0.5, transition: { duration: 0.1 } },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
  };
  return (
    <>
      <SheetPrimitive.Root open={open} modal={true}>
        <SheetPrimitive.Trigger asChild>
          <Button variant="outline" size="icon" className="md:hidden p-2" onClick={() => setOpen((prev) => !prev)}>
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span key="opened" variants={variants} initial="hidden" animate="visible" exit="hidden">
                  <RxCross2 className="h-5 w-5" />
                </motion.span>
              ) : (
                <motion.span key="closed" variants={variants} initial="hidden" animate="visible" exit="hidden">
                  <BiMenu className="h-5 w-5" />
                </motion.span>
              )}
            </AnimatePresence>
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetPrimitive.Trigger>
        <SheetPrimitive.Portal>
          <SheetPrimitive.Overlay className="fixed inset-0 top-[58px]">
            <SheetPrimitive.Content className="w-screen h-full inset-0 bg-background">
              <nav className="flex flex-col h-full px-4 ">
                <div className="py-4 border-b">
                  <div className="flex flex-grow">
                    <SearchInput />
                  </div>
                </div>
                <ul className="flex-1 py-4 space-y-2">
                  <li>
                    <Link href="/" legacyBehavior passHref>
                      <Button variant="ghost" className="w-full justify-start">
                        Home
                      </Button>
                    </Link>
                  </li>
                  <li>
                    <Link href="https://forms.gle/PedJK1GB7khPwNBp7" target="_blank">
                      <Button variant="ghost" className="w-full justify-start">
                        Feedback 💕
                      </Button>
                    </Link>
                  </li>
                </ul>
                {!isLoggedIn && (
                  <div className="py-4 border-t">
                    <div className="flex flex-col space-y-2">
                      <Link href="/auth/signin" legacyBehavior passHref>
                        <Button variant="outline">Sign In</Button>
                      </Link>
                      <Link href="/auth/signup" legacyBehavior passHref>
                        <Button>Sign Up</Button>
                      </Link>
                    </div>
                  </div>
                )}
              </nav>
            </SheetPrimitive.Content>
          </SheetPrimitive.Overlay>
        </SheetPrimitive.Portal>
      </SheetPrimitive.Root>

      <div aria-label={config.name} className="text-primary">
        {/* <Logo className="w-8 h-8" /> */}
      </div>

      <NavigationMenu className="hidden md:block">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()} active={pathName === "/"}>
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="https://forms.gle/" legacyBehavior passHref target="_blank">
              <NavigationMenuLink className={navigationMenuTriggerStyle()} target="_blank">
                Feedback 💕
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}
