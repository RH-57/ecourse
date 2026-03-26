// import metadata type from next
import type { Metadata } from "next";

// import global styles
import "./globals.css";

// import font dari Google
import { Montserrat, Inter } from "next/font/google";

// init font Montserrat untuk Heading (Judul)
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

// init font Inter untuk Body (Teks Paragraf)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// define metadata untuk SEO dan nama tab browser
export const metadata: Metadata = {
  title: "KelasKonstruksi - Platform Belajar Teknik Sipil & Kontraktor",
  description: "Tingkatkan keahlian teknik sipil Anda bersama praktisi industri. Pelajari Manajemen Proyek, BIM, RAB, dan Struktur Konstruksi.",
};

// define the root layout component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Mengubah lang menjadi "id" karena target audiens Indonesia
    // Memasukkan variabel kedua font ke dalam tag html
    <html lang="id" className={`${montserrat.variable} ${inter.variable}`}>
      {/* Menerapkan Inter sebagai font bawaan untuk seluruh halaman.
        Warna background diubah dari zinc-100 menjadi slate-50 agar selaras dengan tema.
        antialiased ditambahkan agar font terlihat lebih halus di layar.
      */}
      <body className={`${inter.className} bg-slate-50 text-slate-900 antialiased`}>
        <div className="min-h-screen flex flex-col">
          <main className="flex-grow">{children}</main>
        </div>
      </body>
    </html>
  );
}