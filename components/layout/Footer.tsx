import Link from "next/link";
import { 
  HardHat, 
  Mail, 
  MapPin, 
  Phone 
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 pt-16 pb-8 font-sans border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          
          {/* Kolom 1: Brand & Deskripsi */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="group inline-flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500 text-slate-900 shadow-sm">
                <HardHat className="h-5 w-5 stroke-[2.5]" />
              </div>
              <span className="font-heading text-xl font-extrabold tracking-tight text-white">
                Konstruksi<span className="text-amber-500">Pedia</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 pr-4">
              Platform pembelajaran dan sertifikasi teknik sipil terdepan di Indonesia. Kami membantu Anda membangun pondasi karir yang kokoh di industri konstruksi.
            </p>
            
            {/* Social Media (Menggunakan SVG Asli) */}
            <div className="flex items-center gap-4 mt-2">
              <a href="#" className="text-slate-500 transition-colors hover:text-amber-500">
                <span className="sr-only">Facebook</span>
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" className="text-slate-500 transition-colors hover:text-amber-500">
                <span className="sr-only">Instagram</span>
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.88z"/></svg>
              </a>
              <a href="#" className="text-slate-500 transition-colors hover:text-amber-500">
                <span className="sr-only">X (Twitter)</span>
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="#" className="text-slate-500 transition-colors hover:text-amber-500">
                <span className="sr-only">LinkedIn</span>
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>

          {/* Kolom 2: Tautan Cepat */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-6">Perusahaan</h3>
            <ul className="flex flex-col gap-4 text-sm text-slate-400">
              <li><Link href="/tentang-kami" className="transition-colors hover:text-amber-500">Tentang Kami</Link></li>
              <li><Link href="/karir" className="transition-colors hover:text-amber-500">Karir & Lowongan</Link></li>
              <li><Link href="/blog" className="transition-colors hover:text-amber-500">Blog Artikel</Link></li>
              <li><Link href="/mitra" className="transition-colors hover:text-amber-500">Menjadi Mitra / Mentor</Link></li>
            </ul>
          </div>

          {/* Kolom 3: Layanan & Kelas */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-6">Program Kami</h3>
            <ul className="flex flex-col gap-4 text-sm text-slate-400">
              <li><Link href="/kategori/manajemen-proyek" className="transition-colors hover:text-amber-500">Manajemen Proyek</Link></li>
              <li><Link href="/kategori/struktur" className="transition-colors hover:text-amber-500">Struktur & Analisis</Link></li>
              <li><Link href="/sertifikasi" className="transition-colors hover:text-amber-500">Persiapan Sertifikasi (SKA)</Link></li>
              <li><Link href="/b2b" className="transition-colors hover:text-amber-500">Pelatihan Korporat (B2B)</Link></li>
            </ul>
          </div>

          {/* Kolom 4: Kontak */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-6">Hubungi Kami</h3>
            <ul className="flex flex-col gap-4 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-amber-500 shrink-0" />
                <span>Gedung Konstruksi, Lantai 5<br/>Jl. Teknik Sipil No. 123<br/>Jakarta Selatan, 12345</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-amber-500 shrink-0" />
                <span>+62 812 3456 7890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-amber-500 shrink-0" />
                <span>halo@konstruksipedia.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Garis Pemisah & Copyright */}
        <div className="mt-16 flex flex-col items-center justify-between border-t border-slate-800 pt-8 sm:flex-row gap-4">
          <p className="text-xs text-slate-500">
            &copy; {currentYear} KonstruksiPedia. Hak Cipta Dilindungi.
          </p>
          <div className="flex gap-6 text-xs text-slate-500">
            <Link href="/syarat-ketentuan" className="transition-colors hover:text-amber-500">Syarat & Ketentuan</Link>
            <Link href="/kebijakan-privasi" className="transition-colors hover:text-amber-500">Kebijakan Privasi</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}