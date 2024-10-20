import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "components/ui/dialog";
import Button from "components/form-elements/button";
import { IoMdCheckmarkCircle } from "react-icons/io";
import React from "react";

export type CompleteStep = {
  onNext: () => void;
};

export const CompleteStep: React.FC<CompleteStep> = (props) => {
  const { onNext } = props;
  return (
    <>
      <div className="flex justify-center">
        <IoMdCheckmarkCircle className="text-6xl text-primary" />
      </div>
      <DialogHeader>
        <DialogTitle>Setup completed</DialogTitle>
        <DialogDescription>Perfect! Your account is now ready to use.</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button type="button" className="w-full" size="lg" onClick={onNext}>
          Ok
        </Button>
      </DialogFooter>
    </>
  );
};
