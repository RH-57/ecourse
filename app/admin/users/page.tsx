import { prisma } from "@/lib/db";
import SearchInput from "./_components/SearchInput";
import AddUserModal from "./_components/AddUserModal";
import UserTableActions from "./_components/UserTableActions";
import { Shield, GraduationCap, HardHat } from "lucide-react";

// 1. Definisikan Interface Props sesuai standar Next.js 16 (Asynchronous)
interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function AdminUsersPage(props: PageProps) {
  // 2. UNWRAP: Wajib melakukan await pada searchParams sebelum mengakses datanya
  const searchParams = await props.searchParams;
  const query = searchParams.q || "";

  // 3. AMBIL DATA: Query ke database dengan filter pencarian
  const usersData = await prisma.user.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { email: { contains: query, mode: "insensitive" } },
      ],
    },
  });

  // 4. SORTING: Urutkan berdasarkan role (admin -> mentor -> student)
  const roleOrder: Record<string, number> = { 
    admin: 1, 
    mentor: 2, 
    student: 3 
  };
  
  const users = usersData.sort((a, b) => {
    return (roleOrder[a.role] || 4) - (roleOrder[b.role] || 4);
  });

  // Fungsi Helper untuk Badge Role
  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 px-2.5 py-1 text-xs font-bold text-rose-700">
            <Shield className="h-3 w-3" /> admin
          </span>
        );
      case "mentor":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-700">
            <HardHat className="h-3 w-3" /> mentor
          </span>
        );
      default: // student
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">
            <GraduationCap className="h-3 w-3" /> student
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      
      {/* --- HEADER HALAMAN --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-slate-900 sm:text-3xl">
            Data Pengguna
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Kelola semua akun siswa, mentor, dan admin KonstruksiPedia di sini.
          </p>
        </div>
        <AddUserModal />
      </div>

      {/* --- AREA PENCARIAN --- */}
      <div className="mb-6">
        <SearchInput />
      </div>

      {/* --- TABEL DATA PENGGUNA --- */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-900">Nama Pengguna</th>
                <th className="px-6 py-4 font-semibold text-slate-900">Alamat Email</th>
                <th className="px-6 py-4 font-semibold text-slate-900">Peran (Role)</th>
                <th className="px-6 py-4 font-semibold text-slate-900 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                  
                  {/* Kolom Nama */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-slate-600 font-bold uppercase shrink-0">
                        {(user.name || "A").charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{user.name || "Tanpa Nama"}</div>
                      </div>
                    </div>
                  </td>

                  {/* Kolom Email */}
                  <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                    {user.email}
                  </td>

                  {/* Kolom Badge Role */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getRoleBadge(user.role)}
                  </td>

                  {/* Kolom Aksi */}
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <UserTableActions user={user} />
                  </td>

                </tr>
              ))}

              {/* Tampilan jika hasil pencarian kosong */}
              {users.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                    {query ? (
                      <p>Tidak ada hasil untuk pencarian <span className="font-bold text-slate-900">&quot;{query}&quot;</span></p>
                    ) : (
                      "Belum ada data pengguna yang terdaftar."
                    )}
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