"use client"

import { useState } from "react"
import Link from "next/link"
import { ExternalLink, Menu, X, HardHat } from "lucide-react"

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    return (
        <header className="fixed inset-x-0 top-0 z-50">
            <nav className="border-b border-slate-200/70 bg-white/90 backdrop-blur-md">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    
                    {/* Bagian Kiri: Logo & Link Desktop */}
                    <div className="flex items-center gap-8">
                        {/* Logo dengan Ikon Helm Proyek */}
                        <Link href="/" className="group inline-flex items-center gap-2.5">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500 text-slate-900 shadow-sm transition-transform group-hover:scale-105">
                                <HardHat className="h-5 w-5 stroke-[2.5]" />
                            </div>
                            <span className="text-xl font-extrabold tracking-tight text-slate-900">
                                Kelas<span className="text-amber-500">Konstruksi</span>
                            </span>
                        </Link>

                        {/* Menu Desktop */}
                        <div className="hidden md:flex items-center gap-7">
                            <Link href="/kelas" className="text-sm font-semibold text-slate-600 transition-colors hover:text-amber-600">
                                Kelas
                            </Link>
                            <Link href="/sertifikasi" className="text-sm font-semibold text-slate-600 transition-colors hover:text-amber-600">
                                Sertifikasi
                            </Link>
                            <a href="https://t.me/komunitas-sipil" target="_blank" className="group inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 transition-colors hover:text-amber-600">
                                Komunitas
                                <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                        </div>
                    </div>

                    {/* Bagian Kanan: Tombol Auth Desktop */}
                    <div className="hidden md:flex items-center gap-5">
                        <Link 
                            href="/login" 
                            className="text-sm font-bold text-slate-700 transition-colors hover:text-amber-600"
                        >
                            Masuk
                        </Link>
                        <Link
                            href="/register"
                            className="rounded-md bg-slate-900 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-slate-800 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-900/20"
                        >
                            Daftar Sekarang
                        </Link>
                    </div>

                    {/* Tombol Hamburger Mobile */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="inline-flex items-center justify-center rounded-md p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus:outline-none"
                        >
                            <span className="sr-only">Buka menu utama</span>
                            {isMobileMenuOpen ? (
                                <X className="h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Menu Dropdown Mobile */}
                {isMobileMenuOpen && (
                    <div className="border-t border-slate-200/70 bg-white px-4 py-6 shadow-xl md:hidden">
                        <div className="flex flex-col space-y-3">
                            <Link 
                                href="/kelas" 
                                className="rounded-md p-3 text-base font-semibold text-slate-700 hover:bg-amber-50 hover:text-amber-700"
                            >
                                Kelas
                            </Link>
                            <a 
                                href="https://t.me/komunitas-sipil" 
                                target="_blank" 
                                className="flex items-center justify-between rounded-md p-3 text-base font-semibold text-slate-700 hover:bg-amber-50 hover:text-amber-700"
                            >
                                Komunitas <ExternalLink className="h-4 w-4" />
                            </a>
                            
                            <hr className="my-4 border-slate-100" />
                            
                            {/* Tombol Auth Mobile */}
                            <div className="flex flex-col gap-3">
                                <Link 
                                    href="/login" 
                                    className="flex w-full items-center justify-center rounded-md border-2 border-slate-200 px-4 py-3 text-sm font-bold text-slate-800 transition-colors hover:bg-slate-50 hover:border-slate-300"
                                >
                                    Masuk
                                </Link>
                                <Link 
                                    href="/register" 
                                    className="flex w-full items-center justify-center rounded-md bg-amber-500 px-4 py-3 text-sm font-bold text-slate-900 shadow-sm transition-colors hover:bg-amber-400"
                                >
                                    Daftar Sekarang
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    )
}