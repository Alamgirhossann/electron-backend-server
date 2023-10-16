import { z } from 'zod'

const create = z.object({
  body: z.object({
    password: z.string({
      required_error: 'Password is required',
    }),
    generalUser: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First Name is required',
        }),
        lastName: z.string({
          required_error: 'Last Name is required',
        }),
        middleName: z.string({
          required_error: 'Middle Name is required',
        }),
      }),
      gender: z.string({
        required_error: 'Gender is required',
      }),
      email: z
        .string({
          required_error: 'Email is required',
        })
        .email(),
      profileImage: z.string().optional(),
    }),
  }),
})

const update = z.object({
  body: z.object({
    password: z.string().optional(),
    generalUser: z.object({
      name: z.object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        middleName: z.string().optional(),
      }),
      gender: z.string().optional(),
      email: z.string().email().optional(),
      profileImage: z.string().optional(),
    }),
  }),
})

export const GeneralUserValidation = {
  update,
  create,
}
