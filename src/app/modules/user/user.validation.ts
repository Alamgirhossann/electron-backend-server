import { z } from "zod";

const createAdminZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),

    admin: z.object({
      name: z.object({
        firstName: z.string({
          required_error: "First name is required",
        }),
        lastName: z.string({
          required_error: "Last name is required",
        }),
        middleName: z.string().optional(),
      }),

      gender: z.string({
        required_error: "Gender is required",
      }),

      email: z
        .string({
          required_error: "Email is required",
        })
        .email(),

      profileImage: z.string().optional(),
    }),
  }),
});

export const UserValidation = {
  createAdminZodSchema,
};
