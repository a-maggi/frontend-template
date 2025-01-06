import React, { useCallback, useEffect } from "react";
import { Prisma } from "@prisma/client";
import { MdMarkEmailRead } from "react-icons/md";
import { CgSpinner } from "react-icons/cg";
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "components/ui/dialog";
import { toast } from "components/toast";
import Button from "components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "components/form-elements/input-otp";
import { cn } from "lib/utils";

export type MailValidationStepProps = {
  user: Prisma.UserGetPayload<{}>;
  onNext: () => void;
};

export const MailValidationStep: React.FC<MailValidationStepProps> = (props) => {
  const { user, onNext } = props;
  const [otp, setOtp] = React.useState("");
  const [isLoading, setLoading] = React.useState(false);
  const [disabledResend, setDisabledResend] = React.useState(false);
  const [firstRender, setFirstRender] = React.useState(true);

  const handleOtpRequest = useCallback(async () => {
    setDisabledResend(true);
    try {
      const req = await fetch(`/api/account/${user.id}/otp`);
      const res = await req.json();
      if (res.message === "OTP code sent to your email") {
        toast({
          title: "Code sent",
          description: "We have sent a new code to your email.",
          duration: 5000
        });
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "An error occurred, please try again.",
        variant: "default",
        duration: 5000
      });
    }
    setFirstRender(false);
  }, [user.id]);

  const handleOtpValidation = async () => {
    try {
      setLoading(true);
      const req = await fetch(`/api/account/${user.id}/otp`, {
        method: "POST",
        body: JSON.stringify({
          otp
        })
      });
      const res = await req.json();
      if (res.message === "OTP validated successfully") {
        onNext();
      } else {
        throw new Error(res.message);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "An error occurred, please try again.",
        variant: "default",
        duration: 5000
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (disabledResend) {
      interval = setInterval(() => {
        setDisabledResend(false);
      }, 30000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [disabledResend]);

  return (
    <>
      <DialogHeader>
        <DialogTitle>Email validation</DialogTitle>
        <DialogDescription>Almost there! We have sent a code to your email.</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid items-center justify-center gap-4 place-items-center">
          <MdMarkEmailRead className="text-6xl text-primary" />
          <div className="  text-center">Type the code we sent to your email.</div>
          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <Button type="button" size="sm" variant="link" onClick={handleOtpRequest} disabled={disabledResend}>
            {firstRender ? "Resend code" : "Resend code in 30s"}
          </Button>
        </div>
      </div>
      <DialogFooter>
        <Button
          type="button"
          size="lg"
          onClick={handleOtpValidation}
          disabled={otp.length < 6 || isLoading}
          className={cn("transition-all duration-300", {
            "rounded-[0.6rem] px-4": isLoading
          })}
        >
          {isLoading ? <CgSpinner className=" h-4 w-4 animate-spin" /> : "Validate"}
        </Button>
      </DialogFooter>
    </>
  );
};
