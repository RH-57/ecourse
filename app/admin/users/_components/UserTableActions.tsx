"use client";

import { useState, useTransition } from "react";
import { MoreVertical, Edit, Trash2, X, Loader2, AlertTriangle } from "lucide-react";
import { updateUserAction, deleteUserAction } from "@/app/actions/admin/UserAction";

interface UserProps {
  id: string;
  name: string | null;
  email: string;
  role: string;
}

export default function UserTableActions({ user }: { user: UserProps }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleEdit = async (formData: FormData) => {
    startTransition(async () => {
      const result = await updateUserAction(user.id, formData);
      if (result.success) {
        setShowEditModal(false);
        setError(null);
      } else {
        setError(result.error || "Gagal update");
      }
    });
  };

  const handleDelete = async () => {
    startTransition(async () => {
      const result = await deleteUserAction(user.id);
      if (result.success) setShowDeleteModal(false);
      else alert(result.error);
    });
  };

  return (
    <div className="relative flex items-center justify-end">
      
      {/* Action Menu: edit | delete (Dibuat lebih rapat) */}
      {showDropdown && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)} />
          
          {/* Menggunakan right-7 agar menempel pas di samping icon titik tiga */}
          <div className="absolute right-7 flex items-center bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 shadow-lg z-20 animate-in fade-in slide-in-from-right-1 duration-200">
            
            {/* Tombol Edit */}
            <button 
              onClick={() => { setShowEditModal(true); setShowDropdown(false); }}
              className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-600 hover:text-blue-600 transition-colors"
            >
              <Edit className="h-3.5 w-3.5 text-blue-500" />
              edit
            </button>

            {/* Separator Tipis | */}
            <span className="mx-2 text-slate-200 font-light">|</span>

            {/* Tombol Delete */}
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

      {/* Tombol Titik Tiga (Trigger) */}
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
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowEditModal(false)} />
          <div className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden animate-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 p-6">
              <h2 className="text-xl font-bold text-slate-900">Edit Pengguna</h2>
              <button onClick={() => setShowEditModal(false)}><X className="h-6 w-6 text-slate-400" /></button>
            </div>
            <form action={handleEdit} className="p-6 space-y-4">
              {error && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg">{error}</div>}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Nama Lengkap</label>
                <input name="name" defaultValue={user.name || ""} required className="w-full rounded-lg border-slate-200 py-2.5 px-4 text-sm ring-1 ring-slate-200 focus:ring-2 focus:ring-rose-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Email</label>
                <input name="email" defaultValue={user.email} required type="email" className="w-full rounded-lg border-slate-200 py-2.5 px-4 text-sm ring-1 ring-slate-200 focus:ring-2 focus:ring-rose-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Role</label>
                <select name="role" defaultValue={user.role} className="w-full rounded-lg border-slate-200 py-2.5 px-4 text-sm ring-1 ring-slate-200 focus:ring-2 focus:ring-rose-500 outline-none bg-white">
                  <option value="student">student</option>
                  <option value="mentor">mentor</option>
                  <option value="admin">admin</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowEditModal(false)} className="flex-1 px-4 py-2.5 border border-slate-200 rounded-lg text-sm font-bold hover:bg-slate-50">Batal</button>
                <button disabled={isPending} type="submit" className="flex-1 bg-rose-600 text-white rounded-lg text-sm font-bold flex justify-center items-center gap-2">
                  {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Simpan"}
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
          <div className="relative w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl animate-in zoom-in duration-200 text-center">
            <AlertTriangle className="mx-auto h-12 w-12 text-red-600 mb-4" />
            <h2 className="text-xl font-bold text-slate-900 mb-2">Hapus?</h2>
            <p className="text-sm text-slate-500 mb-6 font-medium">{user.email}</p>
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteModal(false)} className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-sm font-bold">Batal</button>
              <button onClick={handleDelete} disabled={isPending} className="flex-1 bg-red-600 text-white rounded-lg text-sm font-bold flex justify-center items-center">
                {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Ya, Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}