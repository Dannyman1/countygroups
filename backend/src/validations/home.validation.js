import { z } from "zod";

export const createHomeSchema = z.object({
  title: z.string().min(3),
  price: z.number().positive(),
  location: z.string().min(2),
  bedrooms: z.number().int().positive(),
  amenities: z.array(z.string()).optional(),
});

export const updateHomeSchema = z.object({
  title: z.string().min(3).optional(),
  price: z.number().positive().optional(),
  location: z.string().min(2).optional(),
  bedrooms: z.number().int().positive().optional(),
  amenities: z.array(z.string()).optional(),
});
