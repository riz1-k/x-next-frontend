import { z } from 'zod';

const localSchema = {
  BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
};

const envSchema = z.object({
  BACKEND_URL: z.string(),
});

export const env = envSchema.parse(localSchema);
