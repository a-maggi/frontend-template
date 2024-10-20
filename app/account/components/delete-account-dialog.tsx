"use client";
import { useState } from "react";
import Button from "components/form-elements/button";
import Dialog, {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "components/ui/dialog";
import Label from "components/form-elements/label";
import { RxReload } from "react-icons/rx";
import Input from "components/form-elements/input";
import { useToast } from "components/toast";
import { signOut } from "next-auth/react";

export type IssuerDialogProps = {
  userId: string;
};

const DeleteAccountDialog: React.FC<IssuerDialogProps> = (props) => {
  const { userId } = props;
  const { toast } = useToast();
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleDeleteAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const req = await fetch(`api/account/${userId}`, {
        method: "DELETE",
        body: JSON.stringify({ email })
      });
      const res = await req.json();
      if (res.message === "User deleted") {
        toast({
          title: "Cuenta eliminada",
          description: "Tu cuenta ha sido eliminada correctamente.",
          duration: 5000
        });
        signOut();
      } else {
        toast({
          title: "Error",
          description: res.message,
          variant: "default",
          duration: 5000
        });
      }
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un error al momento de procesar tu solicitud. Intenta nuevamente más tarde.",
        variant: "destructive",
        duration: 5000
      });
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Eliminar mi cuenta</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleDeleteAccount} className="grid gap-4">
          <DialogHeader className="space-y-1">
            <DialogTitle className="text-2xl">Eliminar cuenta</DialogTitle>
            <DialogDescription>
              Si desea proceder con la eliminación de su cuenta, por favor confirme su email.
            </DialogDescription>
          </DialogHeader>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost">Cancelar</Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  {" "}
                  <RxReload className="mr-2 h-4 w-4 animate-spin" /> Eliminando...
                </>
              ) : (
                "Confirmar eliminación"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAccountDialog;
