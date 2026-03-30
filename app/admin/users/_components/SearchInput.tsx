"use client";

import { Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition, useState, useEffect } from "react";

export default function SearchInput() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();
  
  // State lokal untuk input
  const [value, setValue] = useState(searchParams.get("q")?.toString() || "");

  useEffect(() => {
    // 1. CEK: Jika nilai input sama dengan yang ada di URL, jangan lakukan apa-apa.
    // Ini kunci untuk memutus rantai looping.
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
        // 2. Gunakan scroll: false agar posisi scroll tidak lompat ke atas saat mengetik
        replace(`${pathname}?${params.toString()}`, { scroll: false });
      });
    }, 400); // Naikkan sedikit jeda ke 400ms agar lebih stabil

    return () => clearTimeout(timer);
  }, [value, pathname, replace, searchParams]); 

  return (
    <div className="relative flex-1 max-w-md">
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
        placeholder="Cari nama atau email..."
        className="w-full rounded-lg border-slate-200 pl-10 pr-10 py-2.5 text-sm focus:border-rose-500 focus:ring-rose-500 outline-none ring-1 ring-inset ring-slate-200 transition-all"
      />

      {value && (
        <button 
          onClick={() => setValue("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}