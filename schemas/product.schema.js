import { z } from "zod/v4";

export const productPostSchema = z.object({
  name: z.string().min(3).max(500),
  description: z.string().max(10000),
  price: z.number().positive(),
  categoryId: z.number().int().positive(),
});
export const productUpdateSchema = z.object({
  name: z.string().min(3).max(500).optional(),
  description: z.string().max(10000).optional(),
  price: z.number().positive().optional(),
  categoryId: z.number().int().positive().optional(),
});
