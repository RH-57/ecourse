import { z } from "zod";

// 1. SCHEMA UTAMA
export const categorySchema = z.object({
  name: z
    .string()
    .min(3, "Nama kategori minimal 3 karakter")
    .max(50, "Nama kategori terlalu panjang"),
  
  slug: z
    .string()
    .min(3, "Slug minimal 3 karakter")
    // PERBAIKAN: Regex 0-9 agar mendukung angka
    .regex(/^[a-z0-9-]+$/, "Slug hanya boleh huruf kecil, angka, dan tanda hubung")
    .optional()
    .or(z.literal("")), 

  prefix: z
    .string()
    .min(2, "Prefix minimal 2 karakter")
    .max(5, "Prefix maksimal 5 karakter")
    .regex(/^[A-Za-z]+$/, "Prefix hanya boleh berisi huruf"),

  // PERBAIKAN: Gunakan .nullish() agar aman saat data di DB bernilai null
  description: z
    .string()
    .max(500, "Deskripsi maksimal 500 karakter")
    .nullish()
    .or(z.literal("")),

  image: z
    .string()
    .nullish()
    .or(z.literal("")),

  metaTitle: z
    .string()
    .max(60, "Meta title idealnya maksimal 60 karakter")
    .nullish()
    .or(z.literal("")),

  metaDescription: z
    .string()
    .max(160, "Meta description idealnya maksimal 160 karakter")
    .nullish()
    .or(z.literal("")),
    
  status: z.enum(["active", "inactive"]).default("active"),
});

// 3. EXPORT TYPES
export type CategorySchema = z.infer<typeof categorySchema>;

// Interface untuk Action State
export interface CategoryActionState {
  error?: string;
  success?: boolean;
}