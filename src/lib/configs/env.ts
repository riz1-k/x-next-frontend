import { z } from 'zod';

const localSchema = {
  NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
};

const envSchema = z.object({
  NEXT_PUBLIC_BACKEND_URL: z.string(),
});

export const myEnv = envSchema.parse(localSchema);
