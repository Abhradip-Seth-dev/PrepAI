import { z } from "zod";

export const createInterviewSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
  duration: z
    .number()
    .int("Duration must be an integer")
    .positive("Duration must be greater than 0"),
});