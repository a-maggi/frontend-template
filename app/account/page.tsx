import Separator from "components/ui/separator";
import UpdatePasswordForm from "./components/update-password-form";
import { getServerSession } from "next-auth";
import { authOptions } from "lib/authOptions";
import DeleteAccountDialog from "./components/delete-account-dialog";
import { Alert, AlertDescription, AlertTitle } from "components/ui/alert";
import { BsExclamationCircleFill } from "react-icons/bs";
import { prisma } from "db/client";

export default async function AccountProfile() {
  const session = await getServerSession(authOptions);
  if (!session) return null;
  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id
    }
  });
  if (!user) {
    console.log(session);
    console.warn("User not found", session.user.id);
    return null;
  }
  const isOAuth = !Boolean(user.hashedPassword);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">Cambiar contraseña</h3>
        <p className="text-sm text-muted-foreground">La nueva contraseña debe tener al menos 8 caracteres.</p>
      </div>
      {isOAuth && (
        <Alert>
          <BsExclamationCircleFill className="h-4 w-4" />
          <AlertTitle>Cuenta asociada a un proveedor OAuth</AlertTitle>
          <AlertDescription className="text-muted-foreground">
            Tu cuenta está asociada a un proveedor OAuth y no tiene una contraseña local. Si deseas cambiar tu
            contraseña, puedes hacerlo a través del proveedor OAuth.
          </AlertDescription>
        </Alert>
      )}
      <UpdatePasswordForm userId={session.user.id} isOAuth={isOAuth} />
      <Separator />
      <div>
        <h3 className="text-lg font-medium">Eliminar cuenta</h3>
        <p className="text-sm text-muted-foreground">
          Tu cuenta será eliminada permanentemente, incluyendo todos tus datos y beneficios.
        </p>
      </div>
      <DeleteAccountDialog userId={session.user.id} />
    </div>
  );
}
