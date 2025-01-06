"use client";
import { useState } from "react";
import SignIn from "./sign-in";
import SignUp from "./sign-up";
import Button from "components/ui/button";
import { ResponsiveDialog, ResponsiveDialogContent, ResponsiveDialogTrigger } from "components/ui/responsive-dialog";

const AuthDialog = () => {
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);

  return (
    <>
      <ResponsiveDialog open={openSignIn} onOpenChange={setOpenSignIn} repositionInputs={false}>
        <ResponsiveDialogTrigger asChild>
          <Button variant="ghost">Sign In</Button>
        </ResponsiveDialogTrigger>
        <ResponsiveDialogContent className="md:max-w-80">
          <SignIn onSuccess={() => setOpenSignIn(false)} />
        </ResponsiveDialogContent>
      </ResponsiveDialog>
      <ResponsiveDialog open={openSignUp} onOpenChange={setOpenSignUp} repositionInputs={false}>
        <ResponsiveDialogTrigger asChild>
          <Button color="primary" variant="outline">
            Sign Up
          </Button>
        </ResponsiveDialogTrigger>
        <ResponsiveDialogContent className="md:max-w-80">
          <SignUp onSuccess={() => setOpenSignUp(false)} />
        </ResponsiveDialogContent>
      </ResponsiveDialog>
    </>
  );
};

export default AuthDialog;
