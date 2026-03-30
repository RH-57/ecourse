// file: app/(student)/dashboard/page.tsx
import { getCurrentUser } from "@/lib/auth/session";
import { BookOpen, Clock, Trophy, PlayCircle } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  return (
    <div className="max-w-5xl">
      
      {/* Greeting Section */}
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-extrabold text-slate-900 sm:text-3xl">
          Selamat datang kembali, {user?.name}!
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Mari lanjutkan progres belajarmu hari ini. Kamu sudah menyelesaikan 3 modul minggu ini.
        </p>
      </div>

      {/* Statistik Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-10">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Kelas Aktif</p>
              <p className="text-2xl font-bold text-slate-900">2</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Jam Belajar</p>
              <p className="text-2xl font-bold text-slate-900">14<span className="text-sm font-medium text-slate-500 ml-1">Jam</span></p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <Trophy className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Sertifikat</p>
              <p className="text-2xl font-bold text-slate-900">1</p>
            </div>
          </div>
        </div>
      </div>

      {/* Lanjutkan Belajar Section */}
      <h2 className="text-lg font-bold text-slate-900 mb-4">Lanjutkan Belajar</h2>
      <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm flex flex-col sm:flex-row gap-4 hover:border-amber-300 transition-colors group cursor-pointer">
        
        {/* Thumbnail Video Terakhir */}
        <div className="relative h-40 sm:h-auto sm:w-64 rounded-xl overflow-hidden bg-slate-100 shrink-0">
          <img 
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=400&auto=format&fit=crop" 
            alt="Thumbnail Kelas" 
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/20 flex items-center justify-center group-hover:bg-slate-900/40 transition-colors">
            <PlayCircle className="h-12 w-12 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        {/* Detail Progres */}
        <div className="flex flex-1 flex-col justify-center p-4 sm:p-2">
          <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-amber-600">
            <span>Struktur & Analisis</span>
          </div>
          <h3 className="font-heading text-xl font-bold text-slate-900 mb-2">
            Mastering SAP2000: Desain Struktur Gedung
          </h3>
          <p className="text-sm text-slate-600 mb-6">
            Bab 3: Analisis Beban Gempa Dinamis (Response Spectrum)
          </p>
          
          {/* Progress Bar */}
          <div className="mt-auto">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium text-slate-700">Progres Keseluruhan</span>
              <span className="font-bold text-amber-600">65%</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-amber-500 w-[65%]"></div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}