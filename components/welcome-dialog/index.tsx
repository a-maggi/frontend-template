import { Session } from "next-auth";
import { revalidatePath } from "next/cache";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import { prisma } from "db/client";

export type WelcomeDialogProps = {
  session: Session;
};

export const WelcomeDialog: React.FC<WelcomeDialogProps> = async ({ session }) => {
  const myCookies = await cookies();
  if (myCookies.get("welcome.validation")) return null;
  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id
    }
  });
  if (!user || user.emailVerified) return null;

  const handleDataRevalidation = async () => {
    "use server";
    revalidatePath(`/`);
  };
  const Modal = dynamic(() => import("./Steps"));
  return (
    <Suspense>
      <Modal user={user} onUpdated={handleDataRevalidation} />
    </Suspense>
  );
};

export default WelcomeDialog;
