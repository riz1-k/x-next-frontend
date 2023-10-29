'use client';

import { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';

import {
  FirstRegisterStep,
  SecondRegisterStep,
  type TypeRegisterStep,
} from './register-forms';

interface Props {
  showDialog: boolean;
  setShowDialog: (show: boolean) => void;
}

export const RegisterFormDialog: React.FC<Props> = (props) => {
  const { showDialog, setShowDialog } = props;
  const [step, setStep] = useState<TypeRegisterStep>('step-one');

  const Step = {
    'step-one': (
      <FirstRegisterStep setStep={setStep} setShowDialog={setShowDialog} />
    ),
    'step-two': (
      <SecondRegisterStep setStep={setStep} setShowDialog={setShowDialog} />
    ),
  };

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent className='max-w-xl '>
        <DialogHeader className='-mt-3 px-8'>
          <DialogTitle className='text-2xl font-bold'>
            Step {step === 'step-one' ? 1 : 2} of 2
          </DialogTitle>
        </DialogHeader>
        {Step[step]}
      </DialogContent>
    </Dialog>
  );
};
