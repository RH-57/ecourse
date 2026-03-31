import { prisma } from "@/lib/db";
import SearchInput from "./_components/SearchInput";
import AddUserModal from "./_components/AddUserModal";
import UserTableActions from "./_components/UserTableActions";
import { Shield, GraduationCap, HardHat, Circle, Search } from "lucide-react";

// 1. Tipe Data searchParams sebagai Promise (Next.js 16)
interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function AdminUsersPage(props: PageProps) {
  // 2. UNWRAP searchParams
  const searchParams = await props.searchParams;
  const query = searchParams.q || "";

  // 3. QUERY DATABASE (Filter: Belum Dihapus & Sesuai Pencarian)
  const usersData = await prisma.user.findMany({
    where: {
      deletedAt: null, // <--- KUNCI SOFT DELETE
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { email: { contains: query, mode: "insensitive" } },
      ],
    },
  });

  // 4. SORTING: Admin > Mentor > Student
  const roleOrder: Record<string, number> = { 
    admin: 1, 
    mentor: 2, 
    student: 3 
  };
  
  const users = usersData.sort((a, b) => {
    return (roleOrder[a.role] || 4) - (roleOrder[b.role] || 4);
  });

  // HELPER: Badge untuk Role
  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 px-2.5 py-1 text-[11px] font-bold text-rose-700">
            <Shield className="h-3 w-3" /> admin
          </span>
        );
      case "mentor":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-2.5 py-1 text-[11px] font-bold text-blue-700">
            <HardHat className="h-3 w-3" /> mentor
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-700">
            <GraduationCap className="h-3 w-3" /> student
          </span>
        );
    }
  };

  // HELPER: Badge untuk Status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <span className="inline-flex items-center gap-1.5 text-emerald-600 font-bold text-[11px] uppercase tracking-wider">
            <Circle className="h-2 w-2 fill-emerald-600" /> Active
          </span>
        );
      case "inactive":
        return (
          <span className="inline-flex items-center gap-1.5 text-amber-500 font-bold text-[11px] uppercase tracking-wider">
            <Circle className="h-2 w-2 fill-amber-500" /> Inactive
          </span>
        );
      case "blocked":
        return (
          <span className="inline-flex items-center gap-1.5 text-slate-400 font-bold text-[11px] uppercase tracking-wider">
            <Circle className="h-2 w-2 fill-slate-400" /> Blocked
          </span>
        );
      default:
        return status;
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-slate-900 sm:text-3xl tracking-tight">
            Data Pengguna
          </h1>
          <p className="mt-1 text-sm text-slate-500 font-medium">
            Kelola akses dan status akun KonstruksiPedia.
          </p>
        </div>
        <AddUserModal />
      </div>

      {/* FILTER & SEARCH */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <SearchInput />
        <div className="text-xs text-slate-400 font-medium italic">
          Menampilkan {users.length} pengguna aktif
        </div>
      </div>

      {/* TABEL */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100 text-left text-sm">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="px-6 py-4 font-bold text-slate-900 uppercase tracking-wider text-[11px]">Nama Pengguna</th>
                <th className="px-6 py-4 font-bold text-slate-900 uppercase tracking-wider text-[11px]">Email</th>
                <th className="px-6 py-4 font-bold text-slate-900 uppercase tracking-wider text-[11px]">Role</th>
                <th className="px-6 py-4 font-bold text-slate-900 uppercase tracking-wider text-[11px]">Status</th>
                <th className="px-6 py-4 font-bold text-slate-900 uppercase tracking-wider text-[11px] text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                  
                  {/* Nama */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 font-bold uppercase shrink-0 border border-slate-200 group-hover:border-rose-200 group-hover:bg-rose-50 transition-colors">
                        {(user.name || "A").charAt(0)}
                      </div>
                      <div className="font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                        {user.name || "User"}
                      </div>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="px-6 py-4 whitespace-nowrap text-slate-500 font-medium">
                    {user.email}
                  </td>

                  {/* Role */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getRoleBadge(user.role)}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(user.status)}
                  </td>

                  {/* Aksi */}
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <UserTableActions user={user} />
                  </td>

                </tr>
              ))}

              {/* EMPTY STATE */}
              {users.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="p-3 bg-slate-50 rounded-full mb-3">
                         <Search className="h-6 w-6 text-slate-300" />
                      </div>
                      <p className="text-slate-500 font-medium">
                        {query ? `Tidak ada hasil untuk "${query}"` : "Belum ada data pengguna."}
                      </p>
                    </div>
                  </td>
                </tr>
              )}

            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}