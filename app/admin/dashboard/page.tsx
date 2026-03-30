import { Users, BookOpen, DollarSign, Activity } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-extrabold text-slate-900 sm:text-3xl">
          Ringkasan Sistem
        </h1>
        <p className="mt-2 text-sm text-slate-600">Pantau performa platform KonstruksiPedia secara *real-time*.</p>
      </div>

      {/* Statistik Grid Admin */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {[
          { title: "Total Pendapatan", value: "Rp 12.5M", icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-50" },
          { title: "Total Pengguna", value: "1,240", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
          { title: "Kelas Aktif", value: "24", icon: BookOpen, color: "text-amber-600", bg: "bg-amber-50" },
          { title: "Transaksi Hari Ini", value: "12", icon: Activity, color: "text-rose-600", bg: "bg-rose-50" },
        ].map((stat, index) => (
          <div key={index} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.bg} ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.title}</p>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}