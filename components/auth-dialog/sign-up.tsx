"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { BsGoogle, BsTwitterX } from "react-icons/bs";
import Button from "components/ui/button";
import Label from "components/form-elements/label";
import Input from "components/form-elements/input";
import { useToast } from "components/toast";
import { useSearchParams } from "next/navigation";
import { handlePageRevalidation } from "./actions";
import {
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle
} from "components/ui/responsive-dialog";
import { CgSpinner } from "react-icons/cg";
import { cn } from "lib/utils";

const callbackUrl = process.env.NEXT_PUBLIC_BASE_URL;

type SignUpProps = {
  isModal?: boolean;
  onSuccess?: () => void;
};

const SignUp: React.FC<SignUpProps> = ({ onSuccess, isModal = true }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: ""
  });

  const searchParams = useSearchParams();

  const error = searchParams.get("error");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const req = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(formValues)
      });
      const res = await req.json();
      if (res.message === "User created") {
        toast({
          title: "Account created",
          description: "You have successfully created your account",
          duration: 5000
        });
        await signIn("credentials", {
          redirect: false,
          email: formValues.email,
          password: formValues.password,
          callbackUrl
        });
        await handlePageRevalidation();
        // wait for the page to revalidate for 2 seconds
        await new Promise((resolve) => setTimeout(resolve, 2000));
        onSuccess && onSuccess();
      } else {
        throw new Error("An error occurred while creating the account");
      }
      setLoading(false);
      setFormValues({ name: "", email: "", password: "" });
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error",
        description: "An error occurred while creating the account. Please try again.",
        variant: "destructive",
        duration: 5000
      });
      setFormValues({ name: "", email: "", password: "" });
    }
  };

  const Title = isModal ? ResponsiveDialogTitle : "h2";
  const Description = isModal ? ResponsiveDialogDescription : "p";

  const handleSignIn = (provider: string) => async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // disable the button
    e.currentTarget.disabled = true;
    await signIn(provider, { redirect: false });
  };

  return (
    <>
      <ResponsiveDialogHeader className="space-y-1 text-left">
        {error && (
          <div className="text-red-500 text-sm font-semibold">
            An error occurred while creating the account. Please try again.
          </div>
        )}
        <Title className="text-2xl text-primary-foreground">Sign Up</Title>
        <Description className="leading-snug text-sm text-muted-foreground">
          Create an account to continue. You can also sign up with your social media accounts.
        </Description>
      </ResponsiveDialogHeader>
      <form onSubmit={handleSubmit} className="grid gap-4 mt-4">
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
            <span className="bg-background px-2 text-muted-foreground">or sign up with email</span>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            required={true}
            value={formValues.name}
            onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
          />
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
            id="password"
            autoComplete="current-password"
            type="password"
            required
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
            {loading ? <CgSpinner className=" h-4 w-4 animate-spin" /> : "Sign Up"}
          </Button>
        </ResponsiveDialogFooter>
      </form>
    </>
  );
};

export default SignUp;
