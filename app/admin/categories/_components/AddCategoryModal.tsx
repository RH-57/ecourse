"use client";

import { useState, useTransition, ChangeEvent } from "react";
import { 
  Tags, 
  X, 
  Loader2, 
  Hash, 
  Globe, 
  ImageIcon, 
  AlignLeft, 
  MousePointer2,
  UploadCloud
} from "lucide-react";
import { addCategoryAction } from "@/app/actions/admin/CategoryAction";
import { uploadImageAction } from "@/app/actions/upload"; // Import action upload kita
import { toast } from "sonner";

export default function AddCategoryModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  
  // State untuk pratinjau gambar
  const [preview, setPreview] = useState<string | null>(null);

  const handleClose = () => {
    setIsOpen(false);
    setError(null);
    setPreview(null);
  };

  // Handler saat file dipilih
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const clientAction = async (formData: FormData) => {
    startTransition(async () => {
      try {
        const imageFile = formData.get("image_file") as File;
        let imageUrl = "";

        // 1. Proses Upload jika ada file
        if (imageFile && imageFile.size > 0) {
          const uploadRes = await uploadImageAction(imageFile);
          if (uploadRes.success) {
            imageUrl = uploadRes.url!;
          } else {
            setError(uploadRes.error || "Gagal upload gambar");
            return;
          }
        }

        // 2. Masukkan URL hasil upload (atau string kosong) ke field image
        formData.set("image", imageUrl);

        // 3. Simpan Kategori
        const result = await addCategoryAction(null, formData);

        if (result.success) {
          toast.success("Kategori baru berhasil ditambahkan!");
          handleClose();
        } else {
          setError(result.error || "Terjadi kesalahan sistem");
          toast.error(result.error || "Gagal menambah kategori");
        }
      } catch (err) {
        setError("Gagal memproses permintaan");
      }
    });
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-4 py-2.5 rounded-lg text-sm font-bold transition-colors shadow-sm"
      >
        <Tags className="h-4 w-4" /> Tambah Kategori
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={handleClose} />

      <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between border-b border-slate-100 p-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-rose-50 rounded-lg">
              <Tags className="h-5 w-5 text-rose-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Buat Kategori Baru</h2>
          </div>
          <button onClick={handleClose} className="text-slate-400 hover:text-slate-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form action={clientAction} className="overflow-y-auto max-h-[80vh]">
          <div className="p-6 space-y-6">
            {error && (
              <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-1">
                  <Tags className="h-3.5 w-3.5" /> Nama Kategori
                </label>
                <input name="name" type="text" required placeholder="Contoh: Struktur Baja" className="w-full rounded-lg border-slate-200 py-2.5 px-4 text-sm outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-rose-500" />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-1">
                  <Hash className="h-3.5 w-3.5" /> Prefix Kode (Max 5)
                </label>
                <input name="prefix" type="text" required placeholder="Contoh: SK, BT, MK" className="w-full rounded-lg border-slate-200 py-2.5 px-4 text-sm outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-rose-500 uppercase" />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-1">
                  <MousePointer2 className="h-3.5 w-3.5" /> Slug (Opsional)
                </label>
                <input name="slug" type="text" placeholder="struktur-baja" className="w-full rounded-lg border-slate-200 py-2.5 px-4 text-sm outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-rose-500" />
              </div>

              {/* PERBAIKAN: Input File untuk Image */}
              <div className="md:col-span-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
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
                      className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100 cursor-pointer" 
                    />
                    <p className="mt-1 text-[10px] text-slate-400 font-medium italic">Format: JPG, PNG. Otomatis convert ke WebP.</p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-1">
                  <AlignLeft className="h-3.5 w-3.5" /> Deskripsi Singkat
                </label>
                <textarea name="description" rows={3} placeholder="Jelaskan tentang kategori ini..." className="w-full rounded-lg border-slate-200 py-2.5 px-4 text-sm outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-rose-500 resize-none" />
              </div>
            </div>

            <hr className="border-slate-100" />

            <div>
              <div className="flex items-center gap-2 mb-4">
                <Globe className="h-4 w-4 text-emerald-500" />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Optimasi SEO (Google)</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Meta Title</label>
                  <input name="metaTitle" type="text" placeholder="Judul pencarian Google" className="w-full rounded-lg border-slate-200 py-2.5 px-4 text-sm outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-rose-500" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Meta Description</label>
                  <textarea name="metaDescription" rows={2} placeholder="Deskripsi pencarian Google" className="w-full rounded-lg border-slate-200 py-2.5 px-4 text-sm outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-rose-500 resize-none" />
                </div>
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 bg-slate-50 border-t border-slate-100 p-6 flex gap-3">
            <button type="button" onClick={handleClose} className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-600 rounded-lg font-bold text-sm hover:bg-white">
              Batal
            </button>
            <button disabled={isPending} type="submit" className="flex-1 bg-rose-600 hover:bg-rose-700 text-white px-4 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2">
              {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Simpan Kategori"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}