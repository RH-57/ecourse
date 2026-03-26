import {z} from "zod"

export const updateUserSchema = z.object({
    id: z.cuid("ID user tidak valid"),
    name: z.string().min(2, "Nama minimal 2 karakter"),
    email: z.email("Email tidak valid"),
    password: z
        .string()
        .optional()
        .or(z.literal(""))
        .refine((v) => !v || v.length >= 8, "Password minimal 8 karakter"),
})

export type UpdateUserSchema = z.infer<typeof updateUserSchema>