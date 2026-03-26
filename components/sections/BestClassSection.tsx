import Link from "next/link";
import { Star, Users, BookOpen, Clock } from "lucide-react";

// Data dummy untuk kelas-kelas terbaik
const courses = [
  {
    id: 1,
    title: "Mastering SAP2000: Desain Struktur Gedung Tahan Gempa",
    mentor: "Ir. Budi Santoso, S.T., M.T.",
    category: "Struktur & Analisis",
    rating: 4.9,
    reviews: 128,
    students: 840,
    duration: "12 Jam",
    originalPrice: "Rp 899.000",
    discountPrice: "Rp 499.000",
    isBestseller: true,
    imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Manajemen Proyek Konstruksi & Pembuatan Kurva S",
    mentor: "Andi Wijaya, PMP, PMI-SP",
    category: "Manajemen Proyek",
    rating: 4.8,
    reviews: 95,
    students: 620,
    duration: "8 Jam",
    originalPrice: "Rp 700.000",
    discountPrice: "Rp 349.000",
    isBestseller: true,
    imageUrl: "https://images.unsplash.com/photo-1541888081640-1eb22765c36d?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "AutoCAD & SketchUp untuk Pemodelan Arsitektur",
    mentor: "Siti Rahma, S.Ars",
    category: "BIM & Software",
    rating: 4.7,
    reviews: 210,
    students: 1250,
    duration: "15 Jam",
    originalPrice: "Rp 550.000",
    discountPrice: "Rp 299.000",
    isBestseller: false,
    imageUrl: "https://images.unsplash.com/photo-1536895058696-a69b1c7ba34d?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Estimasi RAB dan Analisis Harga Satuan Pekerjaan (AHSP)",
    mentor: "Hendra Gunawan, S.T.",
    category: "Estimasi & RAB",
    rating: 4.9,
    reviews: 150,
    students: 930,
    duration: "10 Jam",
    originalPrice: "Rp 750.000",
    discountPrice: "Rp 399.000",
    isBestseller: false,
    imageUrl: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=800&auto=format&fit=crop"
  }
];

export default function BestClassesSection() {
  return (
    // Kita gunakan bg-white agar kontras dengan section sebelumnya yang menggunakan bg-slate-50
    <section className="bg-white py-24 sm:py-32 border-t border-slate-100">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-base font-bold uppercase tracking-wider text-amber-500">
              Pilihan Favorit
            </h2>
            <p className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Kelas Konstruksi Terbaik
            </p>
            <p className="mt-4 text-lg text-slate-600">
              Tingkatkan skill Anda dengan materi yang disusun langsung oleh praktisi industri berpengalaman.
            </p>
          </div>
          <Link
            href="/kelas"
            className="hidden md:inline-flex items-center justify-center rounded-md bg-slate-100 px-6 py-3 text-sm font-bold text-slate-900 transition-colors hover:bg-slate-200"
          >
            Lihat Semua Kelas
          </Link>
        </div>

        {/* Grid Kelas */}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2 lg:max-w-none lg:grid-cols-4">
          {courses.map((course) => (
            <Link 
              key={course.id} 
              href={`/kelas/${course.id}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-amber-300"
            >
              {/* Thumbnail Gambar */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-200">
                <img 
                  src={course.imageUrl} 
                  alt={course.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Overlay Gradient Ringan */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                
                {/* Badge Kategori & Bestseller */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 align-start">
                  <span className="inline-flex rounded-md bg-white/90 backdrop-blur-sm px-2.5 py-1 text-xs font-bold text-slate-800 shadow-sm">
                    {course.category}
                  </span>
                  {course.isBestseller && (
                    <span className="inline-flex w-fit rounded-md bg-amber-500 px-2.5 py-1 text-xs font-bold text-white shadow-sm">
                      Terlaris
                    </span>
                  )}
                </div>
              </div>

              {/* Detail Konten */}
              <div className="flex flex-1 flex-col p-6">
                
                {/* Rating & Review */}
                <div className="mb-3 flex items-center gap-1.5 text-sm">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-slate-900">{course.rating}</span>
                  <span className="text-slate-500">({course.reviews})</span>
                </div>

                {/* Judul Kelas */}
                <h3 className="font-heading text-lg font-bold text-slate-900 line-clamp-2 mb-2 group-hover:text-amber-600 transition-colors">
                  {course.title}
                </h3>

                {/* Info Mentor */}
                <p className="text-sm font-medium text-slate-600 mb-4 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-700">
                    {course.mentor.charAt(0)}
                  </span>
                  {course.mentor}
                </p>

                {/* Metadata (Durasi & Siswa) */}
                <div className="mb-6 flex items-center gap-4 text-xs font-medium text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="h-4 w-4" />
                    {course.students} Siswa
                  </div>
                </div>

                {/* Harga & Tombol Beli (Mendorong ke bawah) */}
                <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-slate-400 line-through">
                      {course.originalPrice}
                    </span>
                    <span className="text-lg font-extrabold text-slate-900">
                      {course.discountPrice}
                    </span>
                  </div>
                  <span className="rounded-md bg-amber-50 px-3 py-2 text-sm font-bold text-amber-600 transition-colors group-hover:bg-amber-500 group-hover:text-white">
                    Daftar
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Tombol Mobile (Muncul hanya di HP) */}
        <div className="mt-10 flex justify-center md:hidden">
           <Link
            href="/kelas"
            className="w-full text-center rounded-md bg-slate-100 px-6 py-3 text-sm font-bold text-slate-900 transition-colors hover:bg-slate-200"
          >
            Lihat Semua Kelas
          </Link>
        </div>

      </div>
    </section>
  );
}