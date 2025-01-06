import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "components/ui/dialog";
import Button from "components/ui/button";
import React from "react";
import { config } from "../../config";

export type WelcomeStepProps = {
  name: string;
  onNext: () => void;
};

export const WelcomeStep: React.FC<WelcomeStepProps> = (props) => {
  const { name, onNext } = props;
  return (
    <>
      <DialogHeader>
        <DialogTitle>Welcome to {config.name}</DialogTitle>
        <DialogDescription>
          Hi {name}, welcome to {config.name}. This is a template for building frontend applications.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button type="button" className="w-full" size="lg" onClick={onNext}>
          Begin
        </Button>
      </DialogFooter>
    </>
  );
};
