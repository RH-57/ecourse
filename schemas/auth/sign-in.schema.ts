import {z} from "zod";

export const signInSchema = z.object({
    email: z.email("Email tidak valid"),
    password: z.string().min(8, "Password minimal 8 karakter"),
})

export type SignInSchema = z.infer<typeof signInSchema>