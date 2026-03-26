import Link from "next/link";

export default function CtaSection() {
  return (
    // Background putih di luar container agar menyatu dengan bagian atas/bawahnya
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Container Box Hitam Rounded */}
        <div className="relative isolate overflow-hidden rounded-3xl bg-slate-950 px-6 pt-16 shadow-2xl sm:px-16 md:pt-24 lg:flex lg:items-center lg:gap-x-20 lg:px-24 lg:pt-0">
          
          {/* Efek Cahaya / Glow di Background */}
          <svg
            viewBox="0 0 1024 1024"
            className="absolute top-1/2 left-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
            aria-hidden="true"
          >
            <circle cx={512} cy={512} r={512} fill="url(#gradient-glow)" fillOpacity="0.15" />
            <defs>
              <radialGradient id="gradient-glow">
                <stop stopColor="#f59e0b" /> {/* amber-500 */}
                <stop offset={1} stopColor="#0f172a" /> {/* slate-900 */}
              </radialGradient>
            </defs>
          </svg>

          {/* Bagian Kiri: Teks & Tombol */}
          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl leading-tight">
              Akses Kelas Gratis,<br /> Perkuat Fundamental Sipilmu
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-300">
              Mentor praktisi kami telah menyusun puluhan modul dasar teknik sipil yang bisa kamu pelajari tanpa biaya. Mulai dari membaca gambar kerja (blueprint) hingga pengenalan dasar estimasi RAB.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              <Link
                href="/kelas-gratis"
                className="rounded-full bg-amber-500 px-6 py-3.5 text-sm font-bold text-slate-900 shadow-sm transition-all hover:bg-amber-400 hover:shadow-amber-500/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
              >
                Lihat Kelas Gratis Populer
              </Link>
              <Link href="/panduan" className="text-sm font-semibold leading-6 text-white transition-colors hover:text-amber-400">
                Pelajari alur belajar <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          {/* Bagian Kanan: Kolase Gambar (Menggantikan kartu-kartu UI/UX di contoh) */}
          <div className="relative mt-16 h-80 lg:mt-8 lg:h-[32rem] lg:w-full lg:max-w-md lg:shrink-0 flex items-center justify-center">
            {/* Grid miring untuk menampilkan kolase gambar/karya */}
            <div className="absolute grid grid-cols-2 gap-4 transform rotate-6 scale-110 sm:scale-100 transition-transform duration-700 hover:rotate-0">
              
              {/* Gambar 1 (Atas Kiri) */}
              <div className="flex flex-col gap-4 translate-y-8">
                <img
                  src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=400&auto=format&fit=crop"
                  alt="Desain Struktur"
                  className="rounded-2xl object-cover shadow-2xl opacity-90 transition-opacity hover:opacity-100 h-48 w-full"
                />
                <img
                  src="https://images.unsplash.com/photo-1541888081640-1eb22765c36d?q=80&w=400&auto=format&fit=crop"
                  alt="Konstruksi Lapangan"
                  className="rounded-2xl object-cover shadow-2xl opacity-90 transition-opacity hover:opacity-100 h-64 w-full"
                />
              </div>

              {/* Gambar 2 (Bawah Kanan) */}
              <div className="flex flex-col gap-4 -translate-y-8">
                <img
                  src="https://images.unsplash.com/photo-1536895058696-a69b1c7ba34d?q=80&w=400&auto=format&fit=crop"
                  alt="BIM Modeling"
                  className="rounded-2xl object-cover shadow-2xl opacity-90 transition-opacity hover:opacity-100 h-64 w-full"
                />
                <img
                  src="https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=400&auto=format&fit=crop"
                  alt="Blueprint dan Helm"
                  className="rounded-2xl object-cover shadow-2xl opacity-90 transition-opacity hover:opacity-100 h-48 w-full"
                />
              </div>
              
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}