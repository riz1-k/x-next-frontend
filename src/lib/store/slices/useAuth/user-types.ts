import { z } from 'zod';

export const authUserSchema = z.object({
  _id: z.string(),
  username: z.string(),
  email: z.string().email(),
  dob: z.coerce.date(),
  accountStatus: z.enum(['ACTIVE', 'SUSPENDED', 'DELETED']),
});

export type IAuthUser = z.infer<typeof authUserSchema>;
