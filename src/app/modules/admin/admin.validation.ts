import { z } from "zod";

const updateAdmin = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      middleName: z.string().optional(),
    }),
    gender: z.string().optional(),
    email: z.string().email().optional(),
    profileImage: z.string().optional(),
  }),
});

export const AdminValidation = {
  updateAdmin,
};
