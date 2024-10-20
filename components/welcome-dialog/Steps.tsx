"use client";
import { useState } from "react";
import { Prisma } from "@prisma/client";
import { MailValidationStep } from "./mail-validation-step";
import { WelcomeStep } from "./welcome-step";
import { CompleteStep } from "./complete-step";
import Dialog, { DialogContent } from "components/ui/dialog";

export type StepsProps = {
  user: Prisma.UserGetPayload<{}>;
  onUpdated?: () => void;
};

export const Steps: React.FC<StepsProps> = (props) => {
  const { user } = props;
  const [open, setOpen] = useState(true);
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <Dialog defaultOpen open={open}>
      <DialogContent className="sm:max-w-[525px] outline-0" disableClose={true}>
        <div className="grid gap-4">
          {step === 1 && <WelcomeStep name={user.name!!} onNext={handleNext} />}
          {step === 2 && <MailValidationStep user={user} onNext={handleNext} />}
          {step === 3 && <CompleteStep onNext={handleCloseDialog} />}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Steps;
