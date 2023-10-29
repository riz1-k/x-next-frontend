'use client';
import { useState } from 'react';

import { LoginFormDialog } from '~/components/common/dialogs/login-form-dialog';
import { RegisterFormDialog } from '~/components/common/dialogs/register-form-dialog';
import { Button } from '~/components/ui/button';

export function RegisterDialog(): React.ReactNode {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button type='button' variant='default' onClick={() => setOpen(true)}>
        Create Account
      </Button>
      <RegisterFormDialog showDialog={open} setShowDialog={setOpen} />
    </>
  );
}

export function LoginDialog(): React.ReactNode {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button type='button' variant='default' onClick={() => setOpen(true)}>
        Login
      </Button>
      <LoginFormDialog open={open} setOpen={setOpen} />
    </>
  );
}
