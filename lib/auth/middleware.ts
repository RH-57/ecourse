import {redirect} from 'next/navigation'

import {getCurrentUser} from '@/lib/auth/session'

export async function authIsRequired() {
    const user = await getCurrentUser()

    if(!user) {
        redirect('/sign-in')
    }

    return user
}

export async function authIsNotRequired() {
    const user = await getCurrentUser()

    if (user) {
        redirect('/dashboard')
    }
}