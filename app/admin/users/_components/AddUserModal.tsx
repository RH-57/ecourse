"use client";

import { useState, useActionState, useTransition } from "react";
import { UserPlus, X, Shield, HardHat, GraduationCap, Loader2 } from "lucide-react";
import { addUserAction } from "@/app/actions/admin/UserAction";
import { toast } from "sonner";

export default function AddUserModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleClose = () => {
    setIsOpen(false);
    setError(null);
  };

  const clientAction = async (formData: FormData) => {
    startTransition(async () => {
      const result = await addUserAction(null, formData);

      if (result.success) {
        // JIKA BERHASIL: Langsung tutup modal di sini
        toast.success("User baru berhasil ditambahkan!");
        handleClose();
      } else {
        // JIKA GAGAL: Tampilkan pesan error
        setError(result.error || "Terjadi kesalahan sistem");
        toast.error(result.error || "Gagal menambah user");
      }
    });
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-4 py-2.5 rounded-lg text-sm font-bold transition-colors shadow-sm"
      >
        <UserPlus className="h-4 w-4" /> Tambah Pengguna
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />

      {/* Konten Modal */}
      <div className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between border-b border-slate-100 p-6">
          <h2 className="text-xl font-bold text-slate-900">Tambah Pengguna</h2>
          <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form action={clientAction} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Nama Lengkap</label>
            <input name="name" type="text" required placeholder="Contoh: John Doe" className="w-full rounded-lg border-slate-200 py-2.5 px-4 text-sm outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-rose-500" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
            <input name="email" type="email" required placeholder="john@example.com" className="w-full rounded-lg border-slate-200 py-2.5 px-4 text-sm outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-rose-500" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Peran (Role)</label>
            <select name="role" className="w-full rounded-lg border-slate-200 py-2.5 px-4 text-sm outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-rose-500">
              <option value="student">student</option>
              <option value="mentor">mentor</option>
              <option value="admin">admin</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Password Awal</label>
            <input name="password" type="password" required placeholder="Minimal 8 karakter" className="w-full rounded-lg border-slate-200 py-2.5 px-4 text-sm outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-rose-500" />
          </div>

          <div className="pt-4 flex gap-3">
            <button type="button" onClick={() => setIsOpen(false)} className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-600 rounded-lg font-bold text-sm hover:bg-slate-50">
              Batal
            </button>
            <button disabled={isPending} type="submit" className="flex-1 bg-rose-600 hover:bg-rose-700 text-white px-4 py-2.5 rounded-lg text-sm font-bold shadow-sm flex items-center justify-center gap-2">
              {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Simpan Data"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}