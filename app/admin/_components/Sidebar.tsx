"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  CreditCard,
  Settings,
  LogOut,
  ShieldCheck,
  Menu,
  X,
  Tag,
} from "lucide-react";
import { logoutAction } from "@/app/actions/auth/SignIn";

const menuItems = [
  { name: "Ringkasan", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Kelola Pengguna", href: "/admin/users", icon: Users },
  { name: "Kelola Kategori", href: "/admin/categories", icon: Tag },
  { name: "Kelola Kelas", href: "/admin/courses", icon: BookOpen },
  { name: "Data Transaksi", href: "/admin/transactions", icon: CreditCard },
  { name: "Pengaturan Sistem", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  const handleLogout = async () => {
    await logoutAction();
  };

  return (
    <>
      {/* Hamburger */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-3 left-4 z-40 p-2 text-slate-600 bg-white rounded-md border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden"
          onClick={handleClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-64 flex-col border-r border-slate-800 bg-slate-900 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:static lg:translate-x-0 lg:sticky lg:top-0`}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b border-slate-800 px-6">
          <Link
            href="/"
            onClick={handleClose}
            className="flex items-center gap-2.5 hover:opacity-90"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-rose-500 text-white">
              <ShieldCheck className="h-5 w-5 stroke-[2.5]" />
            </div>
            <span className="text-lg font-extrabold text-white">
              Admin<span className="text-rose-500">Panel</span>
            </span>
          </Link>

          <button
            onClick={handleClose}
            className="lg:hidden p-1 text-slate-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Menu Utama */}
        <nav className="flex-1 space-y-1.5 p-4 overflow-y-auto">
          <p className="px-3 text-xs font-bold uppercase text-slate-500 mb-2">
            Menu Utama
          </p>

          {menuItems.map((item) => {
            const isActive =
              pathname === item.href ||
              pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={handleClose} 
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors
                ${
                  isActive
                    ? "bg-rose-500/10 text-rose-500"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon
                  className={`h-5 w-5 ${
                    isActive ? "text-rose-500" : "text-slate-500"
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Area Tindakan Tambahan (Bawah) */}
        <div className="border-t border-slate-800 p-4 space-y-2">
          
          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-rose-500 hover:bg-rose-500/10 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Keluar Sistem
          </button>
        </div>
      </aside>
    </>
  );
}