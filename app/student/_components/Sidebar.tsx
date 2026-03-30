// file: app/(student)/_components/Sidebar.tsx
"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  BookOpen, 
  Award, 
  CreditCard, 
  Settings, 
  LogOut, 
  HardHat 
} from "lucide-react";
import { logoutAction } from "@/app/actions/auth/SignIn";

const menuItems = [
  { name: "Ringkasan", href: "student/dashboard", icon: LayoutDashboard },
  { name: "Kelas Saya", href: "student/kelas-saya", icon: BookOpen },
  { name: "Sertifikat", href: "student/sertifikat", icon: Award },
  { name: "Riwayat Transaksi", href: "student/transaksi", icon: CreditCard },
  { name: "Pengaturan", href: "student/pengaturan", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 flex-col border-r border-slate-200 bg-white lg:flex h-screen sticky top-0">
      {/* Logo Area */}
      <div className="flex h-16 items-center border-b border-slate-100 px-6">
        <Link href="/" className="flex items-center gap-2.5 hover:opacity-90 transition-opacity">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-amber-500 text-slate-900 shadow-sm">
            <HardHat className="h-5 w-5 stroke-[2.5]" />
          </div>
          <span className="font-heading text-lg font-extrabold tracking-tight text-slate-900">
            Konstruksi<span className="text-amber-500">Pedia</span>
          </span>
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 space-y-1.5 p-4 overflow-y-auto">
        {/* Label Kategori Menu */}
        <p className="px-3 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
          Menu Siswa
        </p>
        
        {menuItems.map((item) => {
          // Mengecek apakah URL saat ini sama dengan link menu
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive 
                  ? "bg-amber-50 text-amber-600" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? "text-amber-500" : "text-slate-400"}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout Area di Bawah */}
      <div className="border-t border-slate-100 p-4">
        {/* Pastikan action form ini mengarah ke route logout backend Anda */}
        <form action={logoutAction}>
          <button 
            type="submit"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="h-5 w-5 text-red-500" />
            Keluar Akun
          </button>
        </form>
      </div>
    </aside>
  );
}