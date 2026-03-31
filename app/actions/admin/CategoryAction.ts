'use server'

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { categorySchema } from "@/schemas/categories/category-create.schema";
import { updateCategorySchema } from "@/schemas/categories/category-update.schema";

/**
 * Helper untuk membuat slug yang bersih dan URL-friendly
 */
const slugify = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
};

export interface CategoryActionState {
  error?: string;
  success?: boolean;
}

// --- 1. ACTION: TAMBAH KATEGORI ---
export async function addCategoryAction(prevState: CategoryActionState | null, formData: FormData) {
  // Ambil data dari FormData
  const rawData = {
    name: formData.get("name") as string,
    prefix: formData.get("prefix") as string,
    slug: formData.get("slug") as string,
    description: formData.get("description") as string,
    image: formData.get("image") as string,
    metaTitle: formData.get("metaTitle") as string,
    metaDescription: formData.get("metaDescription") as string,
  };

  // Validasi dengan Zod
  const validatedFields = categorySchema.safeParse(rawData);

  if (!validatedFields.success) {
    // Ambil pesan error pertama yang ditemukan
    const errorMsg = validatedFields.error.flatten().fieldErrors;
    return { 
      error: Object.values(errorMsg)[0]?.[0] || "Input tidak valid." 
    };
  }

  const { name, prefix, description, image, metaTitle, metaDescription } = validatedFields.data;
  
  // Generate slug otomatis jika admin tidak mengisi manual
  const slug = rawData.slug ? slugify(rawData.slug) : slugify(name);
  const upperPrefix = prefix.toUpperCase();

  try {
    // Cek apakah data unik sudah ada (Hanya cek data yang BELUM dihapus/soft delete)
    const existing = await prisma.category.findFirst({
      where: {
        deletedAt: null,
        OR: [
          { name: { equals: name, mode: 'insensitive' } },
          { slug: { equals: slug, mode: 'insensitive' } },
          { prefix: { equals: upperPrefix, mode: 'insensitive' } }
        ]
      }
    });

    if (existing) {
      if (existing.name.toLowerCase() === name.toLowerCase()) return { error: "Nama kategori sudah ada!" };
      if (existing.prefix === upperPrefix) return { error: "Prefix sudah digunakan!" };
      return { error: "Slug sudah digunakan oleh kategori lain!" };
    }

    // Simpan ke Database
    await prisma.category.create({
      data: {
        name,
        slug,
        prefix: upperPrefix,
        description,
        image,
        metaTitle,
        metaDescription,
        status: "active"
      },
    });

    revalidatePath("/admin/categories");
    return { success: true };
  } catch (e) {
    console.error("ADD_CATEGORY_ERROR:", e);
    return { error: "Gagal sistem: Tidak dapat menyimpan kategori." };
  }
}

// --- 2. ACTION: UPDATE KATEGORI ---
export async function updateCategoryAction(id: string, formData: FormData) {
  const rawData = {
    id: id, // Wajib disertakan untuk updateCategorySchema
    name: formData.get("name") as string,
    prefix: formData.get("prefix") as string,
    slug: formData.get("slug") as string,
    description: formData.get("description") as string,
    image: formData.get("image") as string,
    status: (formData.get("status") as string)?.toLowerCase(), // Paksa lowercase
    metaTitle: formData.get("metaTitle") as string,
    metaDescription: formData.get("metaDescription") as string,
  };

  const validatedFields = updateCategorySchema.safeParse(rawData);

  if (!validatedFields.success) {
    // Log ini akan muncul di Terminal VS Code Anda untuk debugging
    console.log("DEBUG_ZOD_UPDATE:", validatedFields.error.flatten().fieldErrors);
    
    // Ambil pesan error spesifik dari Zod
    const fieldErrors = validatedFields.error.flatten().fieldErrors;
    const firstErrorMessage = Object.values(fieldErrors).flat()[0];
    
    return { error: firstErrorMessage || "Data tidak valid." };
  }

  const { name, prefix, description, image, status, metaTitle, metaDescription } = validatedFields.data;
  const slug = rawData.slug ? slugify(rawData.slug) : slugify(name);
  const upperPrefix = prefix.toUpperCase();

  try {
    const duplicate = await prisma.category.findFirst({
      where: {
        id: { not: id },
        deletedAt: null,
        OR: [
          { name: { equals: name, mode: 'insensitive' } },
          { slug: { equals: slug, mode: 'insensitive' } },
          { prefix: { equals: upperPrefix, mode: 'insensitive' } }
        ]
      }
    });

    if (duplicate) return { error: "Nama, Slug, atau Prefix sudah digunakan kategori lain." };

    await prisma.category.update({
      where: { id },
      data: { 
        name, 
        slug, 
        prefix: upperPrefix, 
        description, 
        image, 
        status: status as "active" | "inactive",
        metaTitle,
        metaDescription
      }
    });

    revalidatePath("/admin/categories");
    return { success: true };
  } catch (e) {
    console.error("UPDATE_CATEGORY_ERROR:", e);
    return { error: "Gagal memperbarui database." };
  }
}

// --- 3. ACTION: DELETE KATEGORI (SOFT DELETE) ---
export async function deleteCategoryAction(id: string) {
  try {
    // Cek apakah kategori ini masih memiliki kelas aktif
    const courseCount = await prisma.course.count({
      where: { categoryId: id, deletedAt: null }
    });

    if (courseCount > 0) {
      return { error: "Tidak bisa menghapus kategori yang masih memiliki kelas aktif." };
    }

    // Jalankan Soft Delete
    await prisma.category.update({
      where: { id },
      data: { deletedAt: new Date() } 
    });

    revalidatePath("/admin/categories");
    return { success: true };
  } catch (e) {
    console.error("DELETE_CATEGORY_ERROR:", e);
    return { error: "Gagal menghapus kategori." };
  }
}