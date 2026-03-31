import { z } from "zod";

export const updateCategorySchema = z.object({
  id: z.string().min(1, "ID kategori wajib ada"), // Ganti .cuid() jadi .string()
  name: z
    .string()
    .min(3, "Nama kategori minimal 3 karakter")
    .max(50, "Nama kategori terlalu panjang"),
  slug: z
    .string()
    .min(3, "Slug minimal 3 karakter")
    .regex(/^[a-z0-9-]+$/, "Slug hanya boleh huruf kecil, angka, dan tanda hubung")
    .nullish()
    .or(z.literal("")),
  prefix: z
    .string()
    .min(2, "Prefix minimal 2 karakter")
    .max(5, "Prefix maksimal 5 karakter")
    .regex(/^[A-Za-z]+$/, "Prefix hanya boleh berisi huruf"),
  description: z.string().max(500).nullish().or(z.literal("")),
  image: z.string().nullish().or(z.literal("")),
  metaTitle: z.string().max(60).nullish().or(z.literal("")),
  metaDescription: z.string().max(160).nullish().or(z.literal("")),
  // Pakai lowercase untuk konsistensi
  status: z.enum(["active", "inactive"]),
});