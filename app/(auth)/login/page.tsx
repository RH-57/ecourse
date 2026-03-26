// import authIsNotRequired dari lib/auth
import LoginPage from '@/components/auth/SignIn';
import { authIsNotRequired } from '@/lib/auth/middleware'

// import Metadata dari next
import { Metadata } from 'next';

// define metadata untuk halaman sign-in
export const metadata: Metadata = {
  title: 'Login - KontruksiPedia',
  description: 'Login to your account',
};

export default async function SignUpPage() {

    //jika user sudah login, redirect ke halaman dashboard
    await authIsNotRequired();
    
    return <LoginPage />;
}
