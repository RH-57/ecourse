import Link from "next/link";
import { Hammer, Building2, Ruler, BookOpen, ChevronRight } from "lucide-react";
import CategorySection from "@/components/sections/CategorySection";
import BestClassesSection from "@/components/sections/BestClassSection";
import CtaSection from "@/components/sections/CtaSection";

export default function Home() {
  return (
    <>
    <div className="relative min-h-screen font-sans overflow-hidden z-0">
      
      {/* 1. Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover object-center -z-20"
      >
        {/* Ubah src sesuai dengan lokasi dan nama video Anda di folder public */}
        <source src="/videos/hero-construction.mp4" type="video/mp4" />
        Video tidak didukung oleh browser Anda.
      </video>

      {/* 2. Overlay Gelap (Agar video tidak terlalu terang dan kartu lebih menonjol) */}
      <div className="absolute inset-0 bg-slate-900/40 -z-10 mix-blend-multiply" />

      {/* Konten Utama */}
      <div className="relative flex min-h-screen items-center justify-center px-6 pt-20 pb-12">
        <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Kolom Kiri: Kartu Teks & CTA (Dibuat Frosted Glass) */}
          <div className="rounded-3xl bg-white/85 p-8 shadow-2xl backdrop-blur-xl sm:p-10 border border-white/20">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200/60 bg-white/90 px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              Platform Belajar No.1 Teknik Sipil Indonesia
            </div>

            {/* Heading */}
            <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl leading-tight">
              Bangun <span className="text-amber-500">Karir Kuat</span> di Dunia Konstruksi
            </h1>

            {/* Description */}
            <p className="mt-6 text-pretty text-base leading-relaxed text-slate-700 sm:text-lg">
              Tingkatkan keahlian teknis Anda bersama praktisi industri. Pelajari mulai dari{" "}
              <span className="font-bold text-slate-900">Manajemen Proyek</span>,{" "}
              <span className="font-bold text-slate-900">Struktur Beton</span>,{" "}
              <span className="font-bold text-slate-900">RAB & Estimasi</span>, hingga penggunaan{" "}
              <span className="font-bold text-slate-900">BIM</span>.
            </p>

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/register"
                className="group inline-flex items-center justify-center gap-2 rounded-md bg-amber-500 px-6 py-3.5 text-sm font-bold text-slate-900 shadow-lg shadow-amber-500/30 transition-all hover:bg-amber-400 hover:shadow-amber-500/50 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              >
                Mulai Belajar Sekarang
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/kelas"
                className="inline-flex items-center justify-center rounded-md border-2 border-slate-300 bg-white/50 px-6 py-3.5 text-sm font-bold text-slate-800 backdrop-blur-sm transition-colors hover:border-slate-400 hover:bg-white/80 focus:outline-none focus:ring-2 focus:ring-slate-300"
              >
                Lihat Katalog Kelas
              </Link>
            </div>

            {/* Footer Hint / Kategori */}
            <div className="mt-10 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-700">
              <span className="rounded-md bg-white/60 backdrop-blur-sm border border-slate-200 px-3 py-1.5 flex items-center gap-1.5"><Building2 className="h-3.5 w-3.5" /> BIM / AutoCAD</span>
              <span className="rounded-md bg-white/60 backdrop-blur-sm border border-slate-200 px-3 py-1.5 flex items-center gap-1.5"><Hammer className="h-3.5 w-3.5" /> Manajemen Proyek</span>
              <span className="rounded-md bg-white/60 backdrop-blur-sm border border-slate-200 px-3 py-1.5 flex items-center gap-1.5"><Ruler className="h-3.5 w-3.5" /> Struktur Analisis</span>
            </div>
          </div>

          {/* Kolom Kanan: Fitur (Disesuaikan agar lebih menyatu dengan video) */}
          <div className="hidden lg:flex flex-col gap-6 justify-center">
             <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20 transform transition duration-300 hover:-translate-y-2">
                    <div className="h-12 w-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-4 shadow-sm">
                        <BookOpen className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Materi Praktis</h3>
                    <p className="text-sm text-slate-600">Studi kasus nyata dari proyek konstruksi berskala nasional.</p>
                </div>
                
                <div className="bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-slate-700 transform transition duration-300 hover:-translate-y-2 translate-y-8">
                    <div className="h-12 w-12 bg-amber-500 text-slate-900 rounded-xl flex items-center justify-center mb-4 shadow-sm">
                        <Building2 className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Mentor Ahli</h3>
                    <p className="text-sm text-slate-300">Dibimbing langsung oleh insinyur dan kontraktor tersertifikasi.</p>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
    <CategorySection />
    <BestClassesSection />
    <CtaSection />
    </>
  );
}