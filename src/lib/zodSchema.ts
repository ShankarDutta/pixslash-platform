import z from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(5, { error: "Name must be at least 5 characters long" })
      .max(32, { error: "Name must not exceed 32 characters" }),
    emailAddress: z
      .email({ error: "Please enter a valid  email address." })
      .toLowerCase(),
    password: z
      .string()
      .min(8, "Passsword must be at least 8 characters long")
      .max(128, { error: "Name must not exceed 32 characters" }),
    confirmPassword: z
      .string()
      .min(1, { error: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Password didn't match",
    path: ["confirmPassword"],
  });
