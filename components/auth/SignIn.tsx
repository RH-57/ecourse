"use client"

import { useState, useActionState } from "react";
import Link from "next/link";
import { HardHat, Eye, EyeOff, ArrowLeft } from "lucide-react";

// Import Server Action Anda (Pastikan path-nya sudah benar)
import { signInAction } from "@/app/actions/auth/SignIn";

// Initial state untuk menangkap error dari form/backend
const initialState = { errors: {} as Record<string, string[]> };

export default function LoginPage() {
  // Hook useActionState untuk menghubungkan UI dengan Server Action
  const [formState, formAction, isPending] = useActionState(signInAction, initialState);
  
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen bg-white font-sans">
      
      {/* BAGIAN KIRI: Formulir Login */}
      {/* py-12 diubah ke py-6 agar jarak atas dan bawah lebih rapat */}
      <div className="flex w-full flex-col justify-center px-6 py-6 lg:w-1/2 lg:px-16 xl:px-24 h-screen overflow-y-auto">
        <div className="mx-auto w-full max-w-md">
          
          {/* Logo (Muncul di semua ukuran layar untuk halaman Login) */}
          <div className="mb-6 flex justify-center lg:justify-start">
            <Link href="/" className="inline-flex items-center gap-2.5 hover:opacity-90 transition-opacity">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500 text-slate-900 shadow-sm">
                <HardHat className="h-6 w-6 stroke-[2.5]" />
              </div>
              <span className="font-heading text-2xl font-extrabold tracking-tight text-slate-900">
                Kelas<span className="text-amber-500">Kontruksi</span>
              </span>
            </Link>
          </div>

          <div className="text-center lg:text-left">
            <h1 className="font-heading text-2xl font-bold tracking-tight text-slate-900">
              Selamat Datang Kembali
            </h1>
            <p className="mt-1.5 text-sm text-slate-500">
              Belum punya akun?{" "}
              <Link href="/register" className="font-bold text-amber-600 transition-colors hover:text-amber-500">
                Daftar sekarang
              </Link>
            </p>
          </div>

          <div className="mt-6"> {/* Diubah dari mt-10 ke mt-6 */}
            
            {/* --- TAMBAHAN: TOMBOL GOOGLE OAUTH --- */}
            <div className="mb-4"> {/* Diubah dari mb-6 ke mb-4 */}
              <a
                href="/api/auth/google"
                className="flex w-full items-center justify-center gap-3 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:border-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-200"
              >
                {/* SVG Logo Google Asli dengan ukuran disesuaikan (h-4) */}
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
                Lanjutkan dengan Google
              </a>
            </div>

            {/* Garis Pemisah (Divider) */}
            <div className="relative mb-4"> {/* Diubah dari mb-5 ke mb-4 */}
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Atau gunakan email
                </span>
              </div>
            </div>
            {/* --- AKHIR TOMBOL GOOGLE --- */}

            {/* Form Action */}
            <form action={formAction} className="space-y-4" noValidate>
              
              {/* Pesan Error Global */}
              {formState?.errors?._form?.length ? (
                <div className="rounded-md border border-red-200 bg-red-50 p-2 text-sm text-red-600">
                  {formState.errors._form[0]}
                </div>
              ) : null}

              {/* Input Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-700">
                  Alamat Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="budi@email.com"
                    disabled={isPending}
                    className={`block w-full rounded-md border-0 py-2 text-slate-900 shadow-sm ring-1 ring-inset placeholder:text-slate-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 px-4 transition-all ${
                      formState?.errors?.email?.length 
                        ? "ring-red-300 focus:ring-red-500" 
                        : "ring-slate-300 focus:ring-amber-500"
                    } disabled:opacity-60 disabled:cursor-not-allowed`}
                  />
                  {formState?.errors?.email?.length ? (
                    <p className="mt-1 text-xs font-medium text-red-500">{formState.errors.email[0]}</p>
                  ) : null}
                </div>
              </div>

              {/* Input Password */}
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-semibold text-slate-700">
                    Kata Sandi
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs font-semibold text-amber-600 hover:text-amber-500 transition-colors"
                  >
                    Lupa sandi?
                  </Link>
                </div>
                <div className="relative mt-1">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    disabled={isPending}
                    className={`block w-full rounded-md border-0 py-2 text-slate-900 shadow-sm ring-1 ring-inset placeholder:text-slate-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 pl-4 pr-10 transition-all ${
                      formState?.errors?.password?.length 
                        ? "ring-red-300 focus:ring-red-500" 
                        : "ring-slate-300 focus:ring-amber-500"
                    } disabled:opacity-60 disabled:cursor-not-allowed`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isPending}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 focus:outline-none disabled:opacity-60"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Eye className="h-4 w-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
                {formState?.errors?.password?.length ? (
                  <p className="mt-1 text-xs font-medium text-red-500">{formState.errors.password[0]}</p>
                ) : null}
              </div>

              {/* Checkbox Remember Me */}
              <div className="flex items-center gap-3 pt-1">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  disabled={isPending}
                  className="h-4 w-4 rounded border-slate-300 text-amber-600 focus:ring-amber-600 disabled:opacity-60 cursor-pointer"
                />
                <label htmlFor="remember" className="text-sm text-slate-600 cursor-pointer select-none">
                  Ingat saya selama 30 hari
                </label>
              </div>

              {/* Tombol Submit */}
              <div className="pt-2"> {/* Diubah dari pt-4 ke pt-2 */}
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex w-full justify-center items-center rounded-md bg-slate-900 px-3 py-2.5 text-sm font-bold leading-6 text-white shadow-sm transition-all hover:bg-slate-800 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isPending ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Memproses...
                    </span>
                  ) : (
                    "Masuk ke Akun"
                  )}
                </button>
              </div>
              
            </form>
          </div>

          <div className="mt-6 text-center lg:text-left"> {/* Diubah dari mt-10 ke mt-6 */}
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Beranda
            </Link>
          </div>

        </div>
      </div>

      {/* BAGIAN KANAN: Visual / Gambar (Disembunyikan di layar HP) */}
      <div className="relative hidden w-1/2 lg:block">
        <img
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop" 
          alt="Proyek Konstruksi"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/40 mix-blend-multiply" />
        
        {/* Opsional: Quote / Testimoni di atas gambar */}
        <div className="absolute inset-0 flex flex-col justify-end p-16 xl:p-24 bg-gradient-to-t from-slate-950/90 to-transparent">
          <blockquote className="border-l-4 border-amber-500 pl-6">
            <p className="text-xl font-medium leading-relaxed text-white drop-shadow-sm">
            &quot;Platform ini benar-benar mengubah cara saya memahami manajemen proyek. Ilmunya sangat praktikal dan langsung bisa diterapkan di lapangan.&quot;
            </p>
            <footer className="mt-4">
              <p className="text-base font-bold text-amber-400">Ir. Gunawan Wibisono</p>
              <p className="text-sm text-slate-300">Project Manager, PT Waskita Karya</p>
            </footer>
          </blockquote>
        </div>
      </div>

    </div>
  );
}