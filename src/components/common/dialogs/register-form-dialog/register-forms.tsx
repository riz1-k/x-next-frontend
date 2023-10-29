'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { type DefaultValues, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { isValid } from 'zod';

import { Button } from '~/components/ui/button';
import { Checkbox } from '~/components/ui/checkbox';
import { Input } from '~/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { axiosPrivate } from '~/lib/configs';
import { useAuthUser } from '~/lib/store';
import { authUserSchema } from '~/lib/store/slices/useAuth/user-types';
import { getErrorMessage } from '~/lib/utils/helpers';

import {
  firstStepSchema,
  type IFirstStepForm,
  type ISecondStepForm,
  secondStepSchema,
} from './register-schemas';

export type TypeRegisterStep = 'step-one' | 'step-two';

interface Props {
  setStep: (step: TypeRegisterStep) => void;
  setShowDialog: (show: boolean) => void;
}

export const FirstRegisterStep: React.FC<Props> = (props) => {
  const { setStep } = props;

  const defaultValues: DefaultValues<IFirstStepForm> = {
    day: undefined,
    email: '',
    month: undefined,
    phoneNumber: undefined,
    username: undefined,
    year: undefined,
  };

  const { register, handleSubmit, formState, watch, setValue } =
    useForm<IFirstStepForm>({
      resolver: zodResolver(firstStepSchema),
      defaultValues,
    });

  async function onSubmit(_values: IFirstStepForm) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStep('step-two');
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }

  return (
    <div>
      <h1 className='my-4 px-8 text-3xl font-bold'>Create your Account</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-y-5 px-8 py-3'
      >
        <Input type='text' placeholder='Name' {...register('username')} />
        {watch('email') === undefined ? (
          <Input
            type='number'
            placeholder='Phone Number'
            {...register('phoneNumber')}
          />
        ) : (
          <Input type='email' placeholder='Email' {...register('email')} />
        )}
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
        <div className='py-2'>
          <span className='text-sm font-semibold'> Date of birth</span>
          <p className='mt-1 text-xs text-gray-500'>
            This will not be shown publicly. Confirm your own age, even if this
            account is for a business, a pet, or something else.
          </p>
        </div>
        <div className='grid grid-cols-8 gap-x-4'>
          <Select
            value={watch('month')?.toString()}
            onValueChange={(value) => setValue('month', parseInt(value))}
          >
            <SelectTrigger className='col-span-4'>
              <SelectValue placeholder='Month' />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month.value} value={month.value.toString()}>
                  {month.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={watch('day')?.toString()}
            onValueChange={(value) => setValue('day', parseInt(value))}
          >
            <SelectTrigger className='col-span-2'>
              <SelectValue placeholder='Day' />
            </SelectTrigger>
            <SelectContent position='item-aligned'>
              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                <SelectItem key={day} value={day.toString()}>
                  {day}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={watch('year')?.toString()}
            onValueChange={(value) => setValue('year', parseInt(value))}
          >
            <SelectTrigger className='col-span-2'>
              <SelectValue placeholder='Year' />
            </SelectTrigger>
            <SelectContent position='item-aligned'>
              {years.map((year) => (
                <SelectItem key={year.value} value={year.value.toString()}>
                  {year.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          type='submit'
          variant='secondary'
          className='mt-5 h-12'
          disabled={!isValid}
          loading={formState.isSubmitting}
        >
          Next
        </Button>
      </form>
    </div>
  );
};

export const SecondRegisterStep: React.FC<Props> = (props) => {
  const { setShowDialog } = props;
  const { setAuthUser } = useAuthUser();
  const defaultValues: DefaultValues<ISecondStepForm> = {
    password: '',
    confirmPassword: '',
    terms: false,
  };

  const { register, handleSubmit, formState, setValue, watch } =
    useForm<ISecondStepForm>({
      resolver: zodResolver(secondStepSchema),
      defaultValues,
    });

  async function onSubmit(values: ISecondStepForm) {
    try {
      const response = await axiosPrivate.post('/user/auth/register', values);
      const userData = authUserSchema.parse(response.data.data);
      setAuthUser(userData);
      toast.success('Account created successfully');
      setShowDialog(false);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }

  return (
    <div>
      <h1 className='my-4 px-8 text-3xl font-bold'>Create your Password</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-y-5 px-8 py-3'
      >
        <Input
          type='password'
          placeholder='Password'
          {...register('password')}
        />
        <Input
          type='password'
          placeholder='Confirm Password'
          {...register('confirmPassword')}
        />

        <div className='flex gap-x-2'>
          <Checkbox
            checked={watch('terms')}
            onCheckedChange={(v) =>
              setValue('terms', typeof v === 'boolean' ? v : false)
            }
          />
          <p className='text-xs'>
            By signing up, you agree to our <Link href='/tos'>Terms</Link>,{' '}
            <Link href='/privacy'>Privacy Policy,</Link> and{' '}
            <Link href='y-cookies'>Cookie Use</Link>. Y may use your contact
            information, including your email address and phone number for
            purposes outlined in our Privacy Policy. Learn more
          </p>
        </div>

        <Button
          type='submit'
          variant='secondary'
          className='mt-5 h-12'
          loading={formState.isSubmitting}
          disabled={!isValid}
        >
          Create Account
        </Button>
      </form>
    </div>
  );
};

const months: Array<{
  label: string;
  value: number;
}> = [
  { label: 'January', value: 1 },
  { label: 'February', value: 2 },
  { label: 'March', value: 3 },
  { label: 'April', value: 4 },
  { label: 'May', value: 5 },
  { label: 'June', value: 6 },
  { label: 'July', value: 7 },
  { label: 'August', value: 8 },
  { label: 'September', value: 9 },
  { label: 'October', value: 10 },
  { label: 'November', value: 11 },
  { label: 'December', value: 12 },
];

const years = Array.from({ length: 121 }, (_, i) => i + 1903)
  .map((year) => ({
    label: year.toString(),
    value: year,
  }))
  .sort((a, b) => b.value - a.value);
