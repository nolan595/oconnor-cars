import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be 100 characters or fewer"),
  phone: z
    .string()
    .trim()
    .max(20, "Phone number must be 20 characters or fewer")
    .regex(/^[\d\s+\-()]+$/, "Phone number contains invalid characters")
    .optional()
    .or(z.literal("")),
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .max(254, "Email address is too long"),
  message: z
    .string()
    .trim()
    .min(1, "Message is required")
    .max(2000, "Message must be 2000 characters or fewer"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
