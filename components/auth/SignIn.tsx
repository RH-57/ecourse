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
      <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-16 xl:px-24 h-screen overflow-y-auto">
        <div className="mx-auto w-full max-w-md">
          
          {/* Logo (Muncul di semua ukuran layar untuk halaman Login) */}
          <div className="mb-10 flex justify-center lg:justify-start">
            <Link href="/" className="inline-flex items-center gap-2.5 hover:opacity-90 transition-opacity">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500 text-slate-900 shadow-sm">
                <HardHat className="h-6 w-6 stroke-[2.5]" />
              </div>
              <span className="font-heading text-2xl font-extrabold tracking-tight text-slate-900">
                Konstruksi<span className="text-amber-500">Pedia</span>
              </span>
            </Link>
          </div>

          <div className="text-center lg:text-left">
            <h1 className="font-heading text-3xl font-bold tracking-tight text-slate-900">
              Selamat Datang Kembali
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Belum punya akun?{" "}
              <Link href="/sign-up" className="font-bold text-amber-600 transition-colors hover:text-amber-500">
                Daftar sekarang
              </Link>
            </p>
          </div>

          <div className="mt-10">
            {/* Form Action */}
            <form action={formAction} className="space-y-5" noValidate>
              
              {/* Pesan Error Global (Misal: Kredensial salah) */}
              {formState?.errors?._form?.length ? (
                <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                  {formState.errors._form[0]}
                </div>
              ) : null}

              {/* Input Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-700">
                  Alamat Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="budi@email.com"
                    disabled={isPending}
                    className={`block w-full rounded-md border-0 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset placeholder:text-slate-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 px-4 transition-all ${
                      formState?.errors?.email?.length 
                        ? "ring-red-300 focus:ring-red-500" 
                        : "ring-slate-300 focus:ring-amber-500"
                    } disabled:opacity-60 disabled:cursor-not-allowed`}
                  />
                  {formState?.errors?.email?.length ? (
                    <p className="mt-1.5 text-xs font-medium text-red-500">{formState.errors.email[0]}</p>
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
                    className="text-sm font-semibold text-amber-600 hover:text-amber-500 transition-colors"
                  >
                    Lupa sandi?
                  </Link>
                </div>
                <div className="relative mt-2">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    disabled={isPending}
                    className={`block w-full rounded-md border-0 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset placeholder:text-slate-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 pl-4 pr-10 transition-all ${
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
                      <EyeOff className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <Eye className="h-5 w-5" aria-hidden="true" />
                    )}
                  </button>
                </div>
                {formState?.errors?.password?.length ? (
                  <p className="mt-1.5 text-xs font-medium text-red-500">{formState.errors.password[0]}</p>
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
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex w-full justify-center items-center rounded-md bg-slate-900 px-3 py-3 text-sm font-bold leading-6 text-white shadow-sm transition-all hover:bg-slate-800 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 disabled:opacity-70 disabled:cursor-not-allowed"
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

          <div className="mt-10 text-center lg:text-left">
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
      {/* Posisi gambar di Login biasanya ditukar (kanan) agar pengguna merasakan perbedaan halaman */}
      <div className="relative hidden w-1/2 lg:block">
        <img
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop" // Anda bisa ganti dengan gambar arsitek/blueprint lainnya
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