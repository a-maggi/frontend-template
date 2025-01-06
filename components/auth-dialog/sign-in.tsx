"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Button from "components/ui/button";
import { BsGoogle, BsTwitterX } from "react-icons/bs";
import Label from "components/form-elements/label";
import Input from "components/form-elements/input";
import { useToast } from "components/toast";
import { cn } from "lib/utils";
import { CgSpinner } from "react-icons/cg";
import { handlePageRevalidation } from "./actions";
import { useSearchParams } from "next/navigation";
import {
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle
} from "components/ui/responsive-dialog";

const callbackUrl = process.env.NEXT_PUBLIC_BASE_URL;

export type SignInProps = {
  isModal?: boolean;
  onSuccess?: () => void;
};

const SignIn: React.FC<SignInProps> = ({ isModal = true, onSuccess }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: ""
  });

  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const error = searchParams.get("error");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      setFormValues({ email: "", password: "" });

      const res = await signIn("credentials", {
        redirect: true,
        email: formValues.email,
        password: formValues.password,
        callbackUrl
      });
      if (res?.ok) {
        await handlePageRevalidation();
        // wait for the page to revalidate for 2 seconds
        await new Promise((resolve) => setTimeout(resolve, 2000));
        onSuccess && onSuccess();
        toast({
          title: "Welcome!",
          description: "You have successfully signed in.",
          duration: 5000
        });
      } else {
        throw new Error("Credentials incorrect");
      }
      setLoading(false);
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      toast({
        title: "Credentials incorrect",
        description: "The email or password you entered do not match our records. Please check and try again.",
        variant: "destructive",
        duration: 5000
      });
    }
  };

  const Title = isModal ? ResponsiveDialogTitle : "h2";
  const Description = isModal ? ResponsiveDialogDescription : "p";

  const handleSignIn = (provider: string) => async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // disable the button
    e.currentTarget.disabled = true;
    await signIn(provider, { callbackUrl, redirect: true });
  };

  return (
    <>
      <ResponsiveDialogHeader className="space-y-1 text-left">
        {error && (
          <div className="text-red-500 text-sm font-semibold">There was an error signing in. Please try again.</div>
        )}
        <Title className="text-2xl text-primary-foreground">Account Login</Title>
        <Description className="leading-snug text-sm text-muted-foreground">
          Sign in to your account to continue. You can also sign in with your social media accounts.
        </Description>
      </ResponsiveDialogHeader>
      <form className="grid gap-4 mt-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-6">
          <Button variant="outline" onClick={handleSignIn("twitter")}>
            <BsTwitterX className="mr-2 h-4 w-4" /> X.com
          </Button>
          <Button variant="outline" onClick={handleSignIn("google")}>
            <BsGoogle className="mr-2 h-4 w-4" />
            Google
          </Button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">or sign in with email</span>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            autoComplete="email"
            type="email"
            required={true}
            value={formValues.email}
            onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            autoComplete="current-password"
            id="password"
            type="password"
            required={true}
            value={formValues.password}
            onChange={(e) => setFormValues({ ...formValues, password: e.target.value })}
          />
        </div>
        <ResponsiveDialogFooter>
          <Button
            type="submit"
            disabled={loading}
            className={cn("transition-all w-full duration-300", {
              "rounded-[0.6rem] px-4 w-auto": loading
            })}
          >
            {loading ? <CgSpinner className=" h-4 w-4 animate-spin" /> : "Sign in"}
          </Button>
        </ResponsiveDialogFooter>
      </form>
    </>
  );
};

export default SignIn;
