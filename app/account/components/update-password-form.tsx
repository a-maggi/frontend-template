"use client";
import Button from "components/form-elements/button";
import Input from "components/form-elements/input";
import Label from "components/form-elements/label";
import { useToast } from "components/toast";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { RxReload } from "react-icons/rx";

export type UpdatePasswordFormProps = { userId: string; isOAuth: boolean };

export const UpdatePasswordForm: React.FC<UpdatePasswordFormProps> = (props) => {
  const { userId, isOAuth } = props;
  const { toast } = useToast();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const req = await fetch(`api/account/${userId}`, {
        method: "PUT",
        body: JSON.stringify({ currentPassword, newPassword, confirmPassword })
      });
      const res = await req.json();
      if (res.message === "Password updated") {
        toast({
          title: "Contraseña actualizada",
          description: "Tu contraseña ha sido actualizada correctamente. Por favor, inicia sesión nuevamente.",
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
    <form className="space-y-4" onSubmit={handleUpdatePassword}>
      <div className="space-y-1">
        <Label htmlFor="current-password" className="text-sm font-medium">
          Contraseña actual
        </Label>
        <Input
          id="current-password"
          required={true}
          type="password"
          value={currentPassword}
          disabled={isOAuth}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="new-password" className="text-sm font-medium">
          Nueva contraseña
        </Label>
        <Input
          id="new-password"
          required={true}
          type="password"
          value={newPassword}
          disabled={isOAuth}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="confirm-password" className="text-sm font-medium">
          Confirmar contraseña
        </Label>
        <Input
          id="confirm-password"
          required={true}
          type="password"
          value={confirmPassword}
          disabled={isOAuth}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <Button type="submit" disabled={loading || isOAuth}>
        {loading ? (
          <>
            <RxReload className="mr-2 h-4 w-4 animate-spin" /> Actualizando contraseña...
          </>
        ) : (
          "Cambiar contraseña"
        )}
      </Button>
    </form>
  );
};

export default UpdatePasswordForm;
