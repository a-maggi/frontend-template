"use client";

import * as React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "components/ui/drawer";
import useMatchMedia from "hooks/useMatchMedia";

interface BaseProps {
  children: React.ReactNode;
}

interface RootResponsiveDialogProps extends BaseProps {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onAnimationEnd?: () => void;
  repositionInputs?: boolean;
}

interface ResponsiveDialogProps extends BaseProps {
  className?: string;
  asChild?: true;
  onAnimationEnd?: () => void;
}

const desktop = "(min-width: 768px)";

const ResponsiveDialog = ({ children, ...props }: RootResponsiveDialogProps) => {
  const isDesktop = useMatchMedia(desktop);
  const ResponsiveDialog = isDesktop ? Dialog : Drawer;

  return <ResponsiveDialog {...props}>{children}</ResponsiveDialog>;
};

const ResponsiveDialogTrigger = ({ className, children, ...props }: ResponsiveDialogProps) => {
  const isDesktop = useMatchMedia(desktop);
  const ResponsiveDialogTrigger = isDesktop ? DialogTrigger : DrawerTrigger;

  return (
    <ResponsiveDialogTrigger className={className} {...props}>
      {children}
    </ResponsiveDialogTrigger>
  );
};

const ResponsiveDialogClose = ({ className, children, ...props }: ResponsiveDialogProps) => {
  const isDesktop = useMatchMedia(desktop);
  const ResponsiveDialogClose = isDesktop ? DialogClose : DrawerClose;

  return (
    <ResponsiveDialogClose className={className} {...props}>
      {children}
    </ResponsiveDialogClose>
  );
};

const ResponsiveDialogContent = ({ className, children, ...props }: ResponsiveDialogProps) => {
  const isDesktop = useMatchMedia(desktop);
  const ResponsiveDialogContent = isDesktop ? DialogContent : DrawerContent;

  return (
    <ResponsiveDialogContent className={className} {...props}>
      {children}
    </ResponsiveDialogContent>
  );
};

const ResponsiveDialogDescription = ({ className, children, ...props }: ResponsiveDialogProps) => {
  const isDesktop = useMatchMedia(desktop);
  const ResponsiveDialogDescription = isDesktop ? DialogDescription : DrawerDescription;

  return (
    <ResponsiveDialogDescription className={className} {...props}>
      {children}
    </ResponsiveDialogDescription>
  );
};

const ResponsiveDialogHeader = ({ className, children, ...props }: ResponsiveDialogProps) => {
  const isDesktop = useMatchMedia(desktop);
  const ResponsiveDialogHeader = isDesktop ? DialogHeader : DrawerHeader;

  return (
    <ResponsiveDialogHeader className={className} {...props}>
      {children}
    </ResponsiveDialogHeader>
  );
};

const ResponsiveDialogTitle = ({ className, children, ...props }: ResponsiveDialogProps) => {
  const isDesktop = useMatchMedia(desktop);
  const ResponsiveDialogTitle = isDesktop ? DialogTitle : DrawerTitle;

  return (
    <ResponsiveDialogTitle className={className} {...props}>
      {children}
    </ResponsiveDialogTitle>
  );
};

const ResponsiveDialogFooter = ({ className, children, ...props }: ResponsiveDialogProps) => {
  const isDesktop = useMatchMedia(desktop);
  const ResponsiveDialogFooter = isDesktop ? DialogFooter : DrawerFooter;

  return (
    <ResponsiveDialogFooter className={className} {...props}>
      {children}
    </ResponsiveDialogFooter>
  );
};

export {
  ResponsiveDialog,
  ResponsiveDialogTrigger,
  ResponsiveDialogClose,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogFooter
};
