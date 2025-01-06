import SignIn from "components/auth-dialog/sign-in";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  robots: "noindex"
};

export default async function Page() {
  return (
    <div className="max-w-[600px]">
      <SignIn isModal={false} />
    </div>
  );
}
