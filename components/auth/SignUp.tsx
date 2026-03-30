"use client"

import { useState, useActionState } from "react";
import Link from "next/link";
import { HardHat, Eye, EyeOff, CheckCircle2 } from "lucide-react";

// Import Server Action Anda
import { signUpAction } from "@/app/actions/auth/SignUp";

// Initial state untuk menangkap error dari backend
const initialState = { errors: {} as Record<string, string[]> };

export function RegisterPage() {
  const [formState, formAction, isPending] = useActionState(signUpAction, initialState);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen bg-white font-sans">
      
      {/* BAGIAN KIRI: Visual / Gambar */}
      <div className="relative hidden w-1/2 lg:block">
        <img
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop"
          alt="Konstruksi Gedung"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/60 to-slate-900/40" />
        
        <div className="absolute bottom-0 left-0 p-16 xl:p-24">
          <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-slate-900 shadow-lg">
            <HardHat className="h-6 w-6 stroke-[2.5]" />
          </div>
          <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl leading-tight drop-shadow-md">
            Mulai Bangun Fondasi<br />Karir Konstruksimu.
          </h2>
          <p className="mt-3 max-w-lg text-base text-slate-300 drop-shadow-sm">
            Bergabunglah dengan ribuan insinyur dan praktisi sipil lainnya untuk meningkatkan keahlian teknis dan manajemen proyek Anda.
          </p>
          
          <div className="mt-6 flex flex-col gap-2.5">
            <div className="flex items-center gap-3 text-slate-200 text-sm">
              <CheckCircle2 className="h-4 w-4 text-amber-500" />
              <span>Akses ke ratusan materi proyek nyata</span>
            </div>
            <div className="flex items-center gap-3 text-slate-200 text-sm">
              <CheckCircle2 className="h-4 w-4 text-amber-500" />
              <span>Sertifikat kelulusan industri</span>
            </div>
            <div className="flex items-center gap-3 text-slate-200 text-sm">
              <CheckCircle2 className="h-4 w-4 text-amber-500" />
              <span>Komunitas diskusi eksklusif</span>
            </div>
          </div>
        </div>
      </div>

      {/* BAGIAN KANAN: Formulir Pendaftaran */}
      {/* py-12 diubah ke py-6 agar jarak atas dan bawah lebih rapat */}
      <div className="flex w-full flex-col justify-center px-6 py-6 lg:w-1/2 lg:px-16 xl:px-24 h-screen overflow-y-auto">
        <div className="mx-auto w-full max-w-md">
          
          <div className="mb-6 flex justify-center lg:hidden">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500 text-slate-900 shadow-sm">
                <HardHat className="h-6 w-6 stroke-[2.5]" />
              </div>
              <span className="font-heading text-2xl font-extrabold tracking-tight text-slate-900">
                Konstruksi<span className="text-amber-500">Pedia</span>
              </span>
            </Link>
          </div>

          <div className="text-center lg:text-left">
            <h1 className="font-heading text-2xl font-bold tracking-tight text-slate-900">
              Daftar Akun Baru
            </h1>
            <p className="mt-1.5 text-sm text-slate-500">
              Sudah punya akun?{" "}
              <Link href="/login" className="font-bold text-amber-600 transition-colors hover:text-amber-500">
                Masuk di sini
              </Link>
            </p>
          </div>

          <div className="mt-6"> {/* Diubah dari mt-10 ke mt-6 */}
            
            {/* TOMBOL GOOGLE OAUTH */}
            <div className="mb-4"> {/* Diubah dari mb-6 ke mb-4 */}
              <a
                href="/api/auth/google"
                className="flex w-full items-center justify-center gap-3 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:border-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-200"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24"> {/* Ukuran SVG sedikit dikecilkan */}
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
                Daftar dengan Google
              </a>
            </div>

            {/* Garis Pemisah (Divider) */}
            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Atau daftar manual
                </span>
              </div>
            </div>

            {/* space-y-5 diubah ke space-y-4 */}
            <form action={formAction} className="space-y-4" noValidate>
              
              {formState?.errors?._form?.length ? (
                <div className="rounded-md border border-red-200 bg-red-50 p-2 text-sm text-red-600">
                  {formState.errors._form[0]}
                </div>
              ) : null}

              {/* Input Nama Lengkap */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-slate-700">
                  Nama Lengkap
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Ir. Budi Santoso"
                    disabled={isPending}
                    className={`block w-full rounded-md border-0 py-2 text-slate-900 shadow-sm ring-1 ring-inset placeholder:text-slate-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 px-4 transition-all ${
                      formState?.errors?.name?.length 
                        ? "ring-red-300 focus:ring-red-500" 
                        : "ring-slate-300 focus:ring-amber-500"
                    } disabled:opacity-60 disabled:cursor-not-allowed`}
                  />
                  {formState?.errors?.name?.length ? (
                    <p className="mt-1 text-xs font-medium text-red-500">{formState.errors.name[0]}</p>
                  ) : null}
                </div>
              </div>

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
                <label htmlFor="password" className="block text-sm font-semibold text-slate-700">
                  Kata Sandi
                </label>
                <div className="relative mt-1">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Minimal 8 karakter"
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

              {/* Checkbox Syarat & Ketentuan */}
              <div>
                <div className="flex items-start mt-2">
                  <div className="flex h-5 items-center">
                    <input
                      id="termsAccepted"
                      name="termsAccepted"
                      type="checkbox"
                      disabled={isPending}
                      className={`h-4 w-4 rounded text-amber-600 focus:ring-amber-600 disabled:opacity-60 disabled:cursor-not-allowed ${
                        formState?.errors?.termsAccepted?.length ? "border-red-300 ring-red-300" : "border-slate-300"
                      }`}
                    />
                  </div>
                  <div className="ml-3 text-xs leading-5">
                    <label htmlFor="termsAccepted" className="text-slate-500">
                      Saya menyetujui{" "}
                      <Link href="/syarat-ketentuan" className="font-semibold text-amber-600 hover:text-amber-500">
                        Syarat Ketentuan
                      </Link>{" "}
                      dan{" "}
                      <Link href="/kebijakan-privasi" className="font-semibold text-amber-600 hover:text-amber-500">
                        Kebijakan Privasi
                      </Link>{" "}
                      yang berlaku.
                    </label>
                  </div>
                </div>
                {formState?.errors?.termsAccepted?.length ? (
                  <p className="mt-1 text-xs font-medium text-red-500">{formState.errors.termsAccepted[0]}</p>
                ) : null}
              </div>

              {/* Tombol Submit */}
              <div className="pt-1">
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
                    "Daftar Sekarang"
                  )}
                </button>
              </div>
              
            </form>
          </div>

          <div className="mt-6 text-center lg:text-left">
            <Link href="/" className="text-sm font-medium text-slate-500 hover:text-slate-700">
              ← Kembali ke Beranda
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}