"use client";

import { useState, useTransition, ChangeEvent } from "react";
import { 
  MoreVertical, 
  Edit, 
  Trash2, 
  X, 
  Loader2, 
  AlertTriangle, 
  Tags, 
  Globe, 
  Hash, 
  ImageIcon, 
  AlignLeft,
  UploadCloud 
} from "lucide-react";
import { updateCategoryAction, deleteCategoryAction } from "@/app/actions/admin/CategoryAction";
import { uploadImageAction } from "@/app/actions/upload"; // Import action upload
import { toast } from "sonner";

interface CategoryProps {
  id: string;
  name: string;
  slug: string;
  prefix: string;
  description: string | null;
  image: string | null;
  status: string;
  metaTitle: string | null;
  metaDescription: string | null;
}

export default function CategoryTableActions({ category }: { category: CategoryProps }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // State untuk preview gambar saat edit
  const [preview, setPreview] = useState<string | null>(category.image);

  const handleCloseEdit = () => {
    setShowEditModal(false);
    setError(null);
    setPreview(category.image); // Reset preview ke gambar asli
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async (formData: FormData) => {
    startTransition(async () => {
      try {
        const imageFile = formData.get("image_file") as File;
        let imageUrl = category.image || ""; // Default gunakan gambar lama

        // 1. Jika ada file baru yang dipilih, proses upload & convert WebP
        if (imageFile && imageFile.size > 0) {
          const uploadRes = await uploadImageAction(imageFile);
          if (uploadRes.success) {
            imageUrl = uploadRes.url!;
          } else {
            setError(uploadRes.error || "Gagal upload gambar baru");
            return;
          }
        }

        // 2. Masukkan URL final ke formData (baik URL baru atau URL lama)
        formData.set("image", imageUrl);

        // 3. Jalankan Update ke Database
        const result = await updateCategoryAction(category.id, formData);
        
        if (result.success) {
          toast.success("Kategori berhasil diperbarui!");
          setShowEditModal(false);
          setError(null);
        } else {
          setError(result.error || "Gagal memperbarui kategori");
          toast.error(result.error || "Terjadi kesalahan");
        }
      } catch (err) {
        setError("Gagal memproses permintaan");
      }
    });
  };

  const handleDelete = async () => {
    startTransition(async () => {
      const result = await deleteCategoryAction(category.id);
      if (result.success) {
        toast.success("Kategori berhasil dihapus");
        setShowDeleteModal(false);
      } else {
        toast.error(result.error || "Gagal menghapus kategori");
      }
    });
  };

  return (
    <div className="relative flex items-center justify-end">
      
      {/* Action Menu Bubble */}
      {showDropdown && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)} />
          <div className="absolute right-7 flex items-center bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 shadow-lg z-20 animate-in fade-in slide-in-from-right-1 duration-200">
            <button 
              onClick={() => { setShowEditModal(true); setShowDropdown(false); }}
              className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-600 hover:text-blue-600 transition-colors"
            >
              <Edit className="h-3.5 w-3.5 text-blue-500" />
              edit
            </button>

            <span className="mx-2 text-slate-200 font-light">|</span>

            <button 
              onClick={() => { setShowDeleteModal(true); setShowDropdown(false); }}
              className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-600 hover:text-red-600 transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5 text-red-500" />
              delete
            </button>
          </div>
        </>
      )}

      {/* Trigger Button */}
      <button 
        onClick={() => setShowDropdown(!showDropdown)}
        className={`p-1.5 rounded-md transition-colors relative z-0 ${
          showDropdown ? "bg-slate-100 text-slate-600" : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"
        }`}
      >
        <MoreVertical className="h-5 w-5" />
      </button>

      {/* --- MODAL EDIT --- */}
      {showEditModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 text-left">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={handleCloseEdit} />
          <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl overflow-hidden animate-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 p-6">
              <div className="flex items-center gap-2">
                <Edit className="h-5 w-5 text-blue-500" />
                <h2 className="text-xl font-bold text-slate-900">Edit Kategori</h2>
              </div>
              <button onClick={handleCloseEdit}><X className="h-6 w-6 text-slate-400" /></button>
            </div>

            <form action={handleEdit} className="overflow-y-auto max-h-[80vh]">
              <div className="p-6 space-y-5">
                {error && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">{error}</div>}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-1"><Tags className="h-3.5 w-3.5" /> Nama Kategori</label>
                    <input name="name" defaultValue={category.name} required className="w-full rounded-lg border-slate-200 py-2 px-4 text-sm ring-1 ring-slate-200 focus:ring-2 focus:ring-rose-500 outline-none" />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-1"><Hash className="h-3.5 w-3.5" /> Prefix Kode</label>
                    <input name="prefix" defaultValue={category.prefix} required className="w-full rounded-lg border-slate-200 py-2 px-4 text-sm ring-1 ring-slate-200 focus:ring-2 focus:ring-rose-500 outline-none uppercase" />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-1">Status</label>
                    <select name="status" defaultValue={category.status.toLowerCase()} className="w-full rounded-lg border-slate-200 py-2 px-4 text-sm ring-1 ring-slate-200 focus:ring-2 focus:ring-rose-500 outline-none bg-white">
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>

                  {/* Input Gambar (Sama seperti Create) */}
                  <div className="md:col-span-2">
                    <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                      <ImageIcon className="h-3.5 w-3.5" /> Gambar Kategori
                    </label>
                    <div className="flex items-center gap-4 p-4 border-2 border-dashed border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-100 border border-slate-200">
                        {preview ? (
                          <img src={preview} alt="Preview" className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-slate-400">
                            <UploadCloud className="h-6 w-6" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <input 
                          name="image_file" 
                          type="file" 
                          accept="image/*"
                          onChange={handleFileChange}
                          className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" 
                        />
                        <p className="mt-1 text-[10px] text-slate-400 font-medium italic">Biarkan kosong jika tidak ingin mengubah gambar.</p>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-1"><AlignLeft className="h-3.5 w-3.5" /> Deskripsi</label>
                    <textarea name="description" defaultValue={category.description || ""} rows={2} className="w-full rounded-lg border-slate-200 py-2 px-4 text-sm ring-1 ring-slate-200 focus:ring-2 focus:ring-rose-500 outline-none resize-none" />
                  </div>
                </div>

                {/* SEO Settings */}
                <div className="pt-2">
                   <div className="flex items-center gap-2 mb-3 text-emerald-600">
                      <Globe className="h-4 w-4" />
                      <span className="text-xs font-bold uppercase tracking-widest">SEO Settings</span>
                   </div>
                   <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">Meta Title</label>
                        <input name="metaTitle" defaultValue={category.metaTitle || ""} className="w-full rounded-lg border-slate-200 py-2 px-4 text-sm ring-1 ring-slate-200 focus:ring-2 focus:ring-rose-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">Meta Description</label>
                        <textarea name="metaDescription" defaultValue={category.metaDescription || ""} rows={2} className="w-full rounded-lg border-slate-200 py-2 px-4 text-sm ring-1 ring-slate-200 focus:ring-2 focus:ring-rose-500 outline-none resize-none" />
                      </div>
                   </div>
                </div>
              </div>

              <div className="flex gap-3 p-6 bg-slate-50 border-t border-slate-100">
                <button type="button" onClick={handleCloseEdit} className="flex-1 px-4 py-2.5 border border-slate-200 rounded-lg text-sm font-bold hover:bg-white transition-colors">Batal</button>
                <button disabled={isPending} type="submit" className="flex-1 bg-blue-600 text-white rounded-lg text-sm font-bold flex justify-center items-center gap-2 shadow-md hover:bg-blue-700 transition-all">
                  {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Simpan Perubahan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL DELETE --- */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowDeleteModal(false)} />
          <div className="relative w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl animate-in zoom-in duration-200 text-center border border-red-100">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Hapus Kategori?</h2>
            <p className="text-sm text-slate-500 mb-6 font-medium">
            Menghapus <span className="font-bold text-slate-900">&quot;{category.name}&quot;</span> akan menyembunyikannya...
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteModal(false)} className="flex-1 px-4 py-2.5 border border-slate-200 rounded-lg text-sm font-bold hover:bg-slate-50">Batal</button>
              <button onClick={handleDelete} disabled={isPending} className="flex-1 bg-red-600 text-white rounded-lg text-sm font-bold flex justify-center items-center hover:bg-red-700 shadow-lg shadow-red-200">
                {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Ya, Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}