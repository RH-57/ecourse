"use client";

import { Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition, useState, useEffect } from "react";

interface SearchInputProps {
  placeholder?: string;
}

export default function SearchInput({ 
  placeholder = "Cari kategori atau prefix..." 
}: SearchInputProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();
  
  // State lokal agar pengetikan terasa instan (tidak lag)
  const [value, setValue] = useState(searchParams.get("q")?.toString() || "");

  useEffect(() => {
    // Memutus rantai looping jika nilai input sama dengan URL
    const currentQuery = searchParams.get("q") || "";
    if (value === currentQuery) return;

    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      
      if (value) {
        params.set("q", value);
      } else {
        params.delete("q");
      }

      startTransition(() => {
        // scroll: false sangat penting agar posisi halaman tidak loncat ke atas
        replace(`${pathname}?${params.toString()}`, { scroll: false });
      });
    }, 400); // Jeda 400ms untuk optimasi performa database

    return () => clearTimeout(timer);
  }, [value, pathname, replace, searchParams]); 

  return (
    <div className="relative flex-1 max-w-md w-full">
      {/* Ikon Search / Loading Spinner */}
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
        {isPending ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-rose-500" />
        ) : (
          <Search className="h-4 w-4" />
        )}
      </div>
      
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border-slate-200 pl-10 pr-10 py-2.5 text-sm focus:border-rose-500 focus:ring-rose-500 outline-none ring-1 ring-inset ring-slate-200 transition-all placeholder:text-slate-400"
      />

      {/* Tombol Clear (X) */}
      {value && (
        <button 
          onClick={() => setValue("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
          title="Bersihkan pencarian"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}