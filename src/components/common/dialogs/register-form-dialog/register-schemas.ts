import { z } from 'zod';

export const registerformSchema = z.object({
  username: z
    .string()
    .min(4, 'Username must be at least 4 characters long')
    .max(20, 'Username must be less than 20 characters long'),
  email: z.string().email('Please enter a valid email address').optional(),
  phoneNumber: z.string().optional(),
  password: z.string().min(6),
  dob: z.coerce.date(),
});

export const firstStepSchema = registerformSchema
  .omit({
    password: true,
    dob: true,
  })
  .extend({
    day: z.number(),
    month: z.number(),
    year: z.number(),
  })
  .refine(
    (values) => {
      if (!values.email && !values.phoneNumber) {
        return false;
      }
      return true;
    },
    {
      message: 'Please enter either an email or phone number',
      path: ['email'],
    }
  );

export const secondStepSchema = registerformSchema
  .pick({
    password: true,
  })
  .extend({
    confirmPassword: z.string().min(6),
    terms: z.boolean(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    }
  )
  .refine(
    (values) => {
      return values.terms;
    },
    {
      message: 'Please accept the terms and conditions',
      path: ['terms'],
    }
  );

export type IFirstStepForm = z.infer<typeof firstStepSchema>;
export type ISecondStepForm = z.infer<typeof secondStepSchema>;
