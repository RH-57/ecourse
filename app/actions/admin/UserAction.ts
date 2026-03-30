'use server'

import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export interface AddUserActionState {
  error?: string;
  success?: boolean;
}

export async function addUserAction(prevState: AddUserActionState | null, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const role = formData.get("role") as "admin" | "mentor" | "student";
  const password = formData.get("password") as string;

  try {
    // 1. Cek apakah email sudah terdaftar
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return { error: "Email sudah digunakan!" };

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Simpan ke database
    await prisma.user.create({
      data: {
        name,
        email,
        role,
        password: hashedPassword,
      },
    });

    // 4. Update tampilan tabel secara otomatis
    revalidatePath("/admin/users");
    return { success: true };
  } catch (e) {
    return { error: "Gagal menambah pengguna." };
  }
}

export async function updateUserAction(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const role = formData.get("role") as "admin" | "mentor" | "student";

  try {
    await prisma.user.update({
      where: { id },
      data: { name, email, role }
    });
    revalidatePath("/admin/users");
    return { success: true };
  } catch (e) {
    return { error: "Gagal memperbarui pengguna." };
  }
}

// Action untuk Hapus User
export async function deleteUserAction(id: string) {
  try {
    await prisma.user.delete({ where: { id } });
    revalidatePath("/admin/users");
    return { success: true };
  } catch (e) {
    return { error: "Gagal menghapus pengguna." };
  }
}