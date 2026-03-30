// file: app/student/layout.tsx
import { getCurrentUser } from "@/lib/auth/session";
import Sidebar from "./_components/Sidebar";
import { Bell } from "lucide-react";
import { redirect } from "next/navigation";

// 1. Ubah komponen menjadi 'async' karena kita akan memanggil database/session
export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  // 2. Panggil fungsinya menggunakan 'await'
  const user = await getCurrentUser();

  // (Opsional tapi disarankan) Tendang ke login jika user tidak ada
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6 lg:px-8 sticky top-0 z-40">
          <h2 className="text-lg font-bold text-slate-800 hidden sm:block">
            Ruang Belajar
          </h2>
          
          <div className="flex items-center gap-4 ml-auto">
            <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
              <Bell className="h-5 w-5" />
            </button>
            <div className="h-8 w-px bg-slate-200"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                {/* 3. Gunakan data 'user' yang sudah diambil */}
                <p className="text-sm font-bold text-slate-900 leading-none">
                  {user.name}
                </p>
                <p className="text-xs text-slate-500 mt-1 capitalize">
                  {user.role}
                </p>
              </div>
              {/* 4. Buat inisial avatar dinamis berdasarkan huruf pertama namanya */}
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white shadow-sm uppercase">
                {(user.name || "S").charAt(0)}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {children}
        </main>
        
      </div>
    </div>
  );
}