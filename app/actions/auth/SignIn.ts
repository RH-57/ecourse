'use server'

import bcrypt from "bcryptjs"
import {prisma} from "@/lib/db"
import { redirect } from "next/navigation"
import { signInSchema } from "@/schemas/auth/sign-in.schema"
import { createSession, deleteSession } from "@/lib/auth/session"

interface SignInActionState {
    errors: {
        email?: string[]
        password?: string[]
        _form?: string[]
    }
}

export async function signInAction(
    _prevState: SignInActionState,
    formData: FormData
): Promise<SignInActionState> {
    
    const result = signInSchema.safeParse({
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    })

    if (!result.success) {
        return {errors: result.error.flatten().fieldErrors}
    }

    const user = await prisma.user.findUnique({
        where: {
            email: result.data.email,
        },
    })

    if (!user || !(await bcrypt.compare(result.data.password, user.password))) {
        return {
            errors: {
                _form: ['Email / Password Salah'],
            },
        }
    }

    await createSession(user.id)

    redirect('/dashboard')

}

export async function logoutAction() {
    await deleteSession()

    redirect('/login')
}