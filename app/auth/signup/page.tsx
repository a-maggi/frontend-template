import SignUp from "components/auth-dialog/sign-up";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  robots: "noindex"
};

export default async function Page() {
  return (
    <div className="max-w-[600px]">
      <SignUp isModal={false} />
    </div>
  );
}
