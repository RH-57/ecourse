import Link from "next/link";
import { 
  HardHat, 
  Calculator, 
  MonitorPlay, 
  Ruler, 
  ArrowRight 
} from "lucide-react";

const categories = [
  {
    name: "Manajemen Proyek",
    description: "Mengelola jadwal, tim, dan risiko proyek dari awal hingga serah terima.",
    icon: HardHat,
    courses: 15,
    href: "/kategori/manajemen-proyek",
    // Ganti URL ini dengan path gambar Anda, contoh: "/images/cat-manajemen.jpg"
    imageUrl: "https://images.unsplash.com/photo-1541888081640-1eb22765c36d?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Struktur & Analisis",
    description: "Perhitungan mekanika, desain beton, dan analisis struktur baja.",
    icon: Ruler,
    courses: 24,
    href: "/kategori/struktur",
    imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "BIM & Software",
    description: "Kuasai AutoCAD, Revit, Tekla, dan pemodelan 3D bangunan.",
    icon: MonitorPlay,
    courses: 18,
    href: "/kategori/bim-software",
    imageUrl: "https://images.unsplash.com/photo-1536895058696-a69b1c7ba34d?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Estimasi Biaya & RAB",
    description: "Teknik menghitung volume, harga satuan, dan menyusun RAB akurat.",
    icon: Calculator,
    courses: 10,
    href: "/kategori/estimasi-rab",
    imageUrl: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=800&auto=format&fit=crop"
  }
];

export default function CategorySection() {
  return (
    <section className="bg-slate-50 py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-bold uppercase tracking-wider text-amber-500">
            Jelajahi Program
          </h2>
          <p className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Kategori Kelas Terpopuler
          </p>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Pilih jalur pembelajaran sesuai dengan keahlian yang ingin Anda tingkatkan di industri konstruksi.
          </p>
        </div>

        {/* Grid Kategori */}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:max-w-none lg:grid-cols-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link 
                key={category.name} 
                href={category.href}
                className="group relative flex h-96 flex-col justify-end overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                {/* 1. Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${category.imageUrl})` }}
                />
                
                {/* 2. Gradient Overlay (Gelap di bawah, transparan di atas) */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/60 to-transparent" />

                {/* 3. Konten Teks (berada di atas overlay karena z-index relatif) */}
                <div className="relative z-10 p-6">
                  {/* Ikon Kategori */}
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500 text-slate-900 shadow-sm transition-transform duration-300 group-hover:-translate-y-1">
                    <Icon className="h-6 w-6 stroke-[2.5]" />
                  </div>
                  
                  {/* Teks Kategori (Dibuat Putih agar kontras dengan gradient gelap) */}
                  <h3 className="text-xl font-bold text-white drop-shadow-sm">
                    {category.name}
                  </h3>
                  
                  {/* Deskripsi (Disembunyikan di awal, muncul saat di-hover) */}
                  <div className="grid grid-rows-[0fr] transition-all duration-300 group-hover:grid-rows-[1fr]">
                     <p className="mt-2 text-sm text-slate-300 overflow-hidden line-clamp-3">
                        {category.description}
                     </p>
                  </div>

                  {/* Footer Kartu */}
                  <div className="mt-4 flex items-center justify-between border-t border-white/20 pt-4">
                    <span className="text-sm font-semibold text-amber-400">
                      {category.courses} Kelas Tersedia
                    </span>
                    <ArrowRight className="h-5 w-5 text-white transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Tombol Lihat Semua */}
        <div className="mt-16 flex justify-center">
          <Link
            href="/kategori"
            className="rounded-full border-2 border-slate-200 bg-white px-8 py-3 text-sm font-bold text-slate-900 transition-colors hover:border-amber-500 hover:bg-amber-50 hover:text-amber-700"
          >
            Lihat Semua Kategori
          </Link>
        </div>

      </div>
    </section>
  );
}