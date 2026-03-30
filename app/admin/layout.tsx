import { getCurrentUser } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import AdminSidebar from "./_components/Sidebar";
import { Bell } from "lucide-react";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  // Pengamanan Ekstra: Tendang jika bukan admin!
  if (!user || user.role !== "admin") {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <AdminSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white pl-16 pr-6 lg:px-8 sticky top-0 z-30">
          <h2 className="text-lg font-bold text-slate-800 hidden sm:block">
            Pusat Kendali
          </h2>
          <div className="flex items-center gap-4 ml-auto">
            <button className="relative p-2 text-slate-400 hover:text-slate-600">
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
              <Bell className="h-5 w-5" />
            </button>
            <div className="h-8 w-px bg-slate-200"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900 leading-none">{user.name}</p>
                <p className="text-xs text-rose-600 font-bold mt-1 capitalize">Administrator</p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-600 text-sm font-bold text-white shadow-sm uppercase">
                {(user.name || "A").charAt(0)}
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