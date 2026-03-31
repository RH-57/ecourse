import { prisma } from "@/lib/db";
import SearchInput from "./_components/SearchInput";
import AddCategoryModal from "./_components/AddCategoryModal";
import CategoryTableActions from "./_components/CategoryTableActions";
import { 
  Tags, 
  Hash, 
  Circle, 
  Search, 
  Globe, 
  ImageIcon, 
  ExternalLink 
} from "lucide-react";
import Image from "next/image";

// 1. Tipe Data searchParams sebagai Promise (Next.js 16)
interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function AdminCategoriesPage(props: PageProps) {
  // 2. UNWRAP searchParams
  const searchParams = await props.searchParams;
  const query = searchParams.q || "";

  // 3. QUERY DATABASE (Filter: Belum Dihapus & Sesuai Pencarian Nama/Prefix)
  const categories = await prisma.category.findMany({
    where: {
      deletedAt: null, // <--- KUNCI SOFT DELETE
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { prefix: { contains: query, mode: "insensitive" } },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // HELPER: Badge untuk Status
  const getStatusBadge = (status: string) => {
    const isActive = status.toLowerCase() === "active";
    return (
      <span className={`inline-flex items-center gap-1.5 font-bold text-[11px] uppercase tracking-wider ${
        isActive ? "text-emerald-600" : "text-amber-500"
      }`}>
        <Circle className={`h-2 w-2 ${isActive ? "fill-emerald-600" : "fill-amber-500"}`} />
        {status}
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-slate-900 sm:text-3xl tracking-tight">
            Kelola Kategori
          </h1>
          <p className="mt-1 text-sm text-slate-500 font-medium">
            Atur pengelompokan kelas dan optimasi SEO kategori KonstruksiPedia.
          </p>
        </div>
        <AddCategoryModal />
      </div>

      {/* FILTER & SEARCH */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="w-full sm:w-80">
          <SearchInput placeholder="Cari kategori atau prefix..." />
        </div>
        <div className="text-xs text-slate-400 font-medium italic">
          Menampilkan {categories.length} kategori aktif
        </div>
      </div>

      {/* TABEL */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100 text-left text-sm">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="px-6 py-4 font-bold text-slate-900 uppercase tracking-wider text-[11px]">Kategori & SEO</th>
                <th className="px-6 py-4 font-bold text-slate-900 uppercase tracking-wider text-[11px]">URL Slug</th>
                <th className="px-6 py-4 font-bold text-slate-900 uppercase tracking-wider text-[11px]">Prefix Kode</th>
                <th className="px-6 py-4 font-bold text-slate-900 uppercase tracking-wider text-[11px]">Status</th>
                <th className="px-6 py-4 font-bold text-slate-900 uppercase tracking-wider text-[11px] text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {categories.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                  
                  {/* Nama & Preview Image */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-100 group-hover:border-rose-200 transition-colors">
                        {item.image ? (
                          <Image 
                            src={item.image} 
                            alt={item.name} 
                            fill 
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-slate-400">
                            <ImageIcon className="h-5 w-5" />
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 group-hover:text-rose-600 transition-colors flex items-center gap-1.5">
                          {item.name}
                          {item.metaTitle && (
                            <span title="SEO Configured">
                            <Globe className="h-3 w-3 text-emerald-500" />
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-400 font-medium font-mono">
                          ID: {item.id}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Slug */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                      <span className="text-slate-300">/</span>
                      {item.slug}
                      <ExternalLink className="h-3 w-3 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </td>

                  {/* Prefix */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                      <Hash className="h-3.5 w-3.5 text-slate-400" />
                      {item.prefix}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(item.status)}
                  </td>

                  {/* Aksi */}
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <CategoryTableActions category={item} />
                  </td>

                </tr>
              ))}

              {/* EMPTY STATE */}
              {categories.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="p-3 bg-slate-50 rounded-full mb-3">
                         <Tags className="h-6 w-6 text-slate-300" />
                      </div>
                      <p className="text-slate-500 font-medium">
                        {query ? `Kategori "${query}" tidak ditemukan.` : "Belum ada kategori yang ditambahkan."}
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