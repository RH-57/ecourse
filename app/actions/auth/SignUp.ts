'use server'

import bcrypt from "bcryptjs"
import {prisma} from "@/lib/db"
import { redirect } from "next/navigation"
import { signUpSchema} from "@/schemas/auth/sign-up.schema"

interface SignUpActionState {
    errors: {
        name?: string[]
        email?: string[]
        password?: string[]
        termsAccepted?: string[]
        _form?: string[]
    }
}

export async function signUpAction (
    _prevState: SignUpActionState,
    formData: FormData
): Promise<SignUpActionState> {

    const result = signUpSchema.safeParse({
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        termsAccepted: formData.get('termsAccepted') === 'on' || formData.get('termsAccepted') === 'true',
    })

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }

    try {
        const hashedPassword = await bcrypt.hash(result.data.password, 10)

        await prisma.user.create({
            data: {
                name: result.data.name,
                email: result.data.email,
                password: hashedPassword,
            },
        })

        redirect('/login')
    } catch (error: unknown) {
        const err = error as { digest?: string; code?: string };

        if (err?.digest?.startsWith('NEXT_REDIRECT')) throw error

        if (err?.code === 'P2002') {
            return {
                errors: {
                email: ['Email already registered'],
                },
            }
        }

        return {
            errors: {
                _form: ['Registration failed, please try again'],
            },
        }
    }
}