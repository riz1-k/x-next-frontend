'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { type DefaultValues, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import { axiosPrivate } from '~/lib/configs';
import { useAuthUser } from '~/lib/store';
import { authUserSchema } from '~/lib/store/slices/useAuth/user-types';
import { getErrorMessage } from '~/lib/utils/helpers';

import { Button } from '../../ui/button';
import { Input } from '../../ui/input';

interface ILoginFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const LoginFormDialog: React.FC<ILoginFormProps> = (props) => {
  const { open, setOpen } = props;
  const { setAuthUser } = useAuthUser();
  const { push } = useRouter();

  const defaultValues: DefaultValues<ILoginFormSchema> = {
    email: '',
    password: undefined,
    phoneNumber: undefined,
  };

  const { register, watch, setValue, formState, handleSubmit } =
    useForm<ILoginFormSchema>({
      resolver: zodResolver(loginFormSchema),
      defaultValues,
    });

  async function onSubmit(values: ILoginFormSchema) {
    try {
      const response = await axiosPrivate.post('/user/auth/login', values);
      toast.success('Logged in successfully');
      const userData = authUserSchema.parse(response.data.data);
      setAuthUser(userData);
      push('/home');
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='max-w-xl'>
        <DialogHeader className='-mt-3 px-8'>
          <DialogTitle className='text-2xl font-bold'>
            Welcome back!
          </DialogTitle>
        </DialogHeader>
        <div>
          <h1 className='my-4 px-8 text-2xl font-bold'>Log in to Y</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-y-5 px-8 py-3'
          >
            {watch('email') === undefined ? (
              <Input
                type='number'
                placeholder='Phone Number'
                {...register('phoneNumber')}
              />
            ) : (
              <Input type='email' placeholder='Email' {...register('email')} />
            )}
            <Input
              type='password'
              placeholder='Password'
              {...register('password')}
            />
            <div className='flex justify-end'>
              <Button
                type='button'
                variant='ghost'
                className='not-sr-only h-2 px-0 py-0 hover:bg-transparent'
                onClick={() => {
                  if (watch('phoneNumber') === undefined) {
                    setValue('phoneNumber', '');
                  } else {
                    setValue('email', '');
                  }
                }}
              >
                <span className='font-semibold text-primary'>
                  Use {watch('phoneNumber') === undefined ? 'phone' : 'email'}{' '}
                  instead
                </span>
              </Button>
            </div>

            <Button
              type='submit'
              variant='secondary'
              className='mt-5 h-12'
              disabled={!formState.isValid}
              loading={formState.isSubmitting}
            >
              Login
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const loginFormSchema = z
  .object({
    email: z.string().email().optional(),
    phoneNumber: z.string().optional(),
    password: z.string().min(6).max(20),
  })
  .refine(
    (val) => {
      if (!val.email && !val.phoneNumber) {
        return false;
      }
      return true;
    },
    {
      message: 'Either email or phone number is required',
      path: ['email', 'phoneNumber'],
    }
  );

type ILoginFormSchema = z.infer<typeof loginFormSchema>;
