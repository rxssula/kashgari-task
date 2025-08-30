import { categoryTypes } from "@/constants";
import { z } from "zod";

export const formSchema = z.object({
  category: z.enum(categoryTypes),
  amount: z.coerce.number().positive("Amount must be a positive number"),
  date: z.date({
    error: "A date of an expense is required",
  }),
  location: z.string(),
  coordinates: z.tuple([z.number(), z.number()]).optional(),
  description: z.string().optional(),
});

export type Expense = z.infer<typeof formSchema>;
