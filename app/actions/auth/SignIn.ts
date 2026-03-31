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

    if (!user || !user.password || !(await bcrypt.compare(result.data.password, user.password))) {
        return {
            errors: {
                _form: ['Email / Password Salah'],
            },
        }
    }

    if (user.status === 'inactive') {
        return {
            errors: {
                _form: ['Akun anda tidak aktif. Silahkan hubungi Admin.'],
            }
        }
    }

    if (user.status === 'blocked') {
        return {
            errors: {
                _form: ['Akun anda diblokir karena melanggar ketentuan!'],
            }
        }
    }

    await createSession(user.id)

    if(user.role === 'admin') {
        redirect('/admin/dashboard')
    }

    if(user.role === 'mentor') {
        redirect('/mentor/dashboard')
    }

    if(user.role === 'student') {
        redirect('/student/dashboard')
    }

    return {
        errors: {}
    }

}

export async function logoutAction() {
    await deleteSession()

    redirect('/login')
}