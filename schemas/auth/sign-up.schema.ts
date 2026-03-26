import {z} from 'zod';

export const signUpSchema = z.object({
    name: z.string().min(2, "Nama minimal 2 karakter"),
    email: z.email("Email tidak valid"),
    password: z.string().min(8, "Password minimal 8 karakter"),
    termsAccepted: z.literal(true, {
        message: "Kamu harus menyutujui Terms & Privacy Policy",
    }),
})

export type SignUpSchema = z.infer<typeof signUpSchema>