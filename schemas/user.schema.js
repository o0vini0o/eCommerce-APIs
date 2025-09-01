import { z } from "zod/v4";

export const userPostSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.string().trim().email(),
  password: z.string().min(6).max(50),
});
export const userUpdateSchema = z.object({
  name: z.string().min(3).max(50).optional(),
  email: z.string().trim().email().optional(),
});
