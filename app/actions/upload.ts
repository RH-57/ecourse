"use server"

import { writeFile, mkdir } from "fs/promises";
import path from "path";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";

export async function uploadImageAction(file: File) {
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 1. Tentukan lokasi penyimpanan (folder public/uploads)
    const uploadDir = path.join(process.cwd(), "public/uploads");
    
    // Pastikan folder exists
    await mkdir(uploadDir, { recursive: true });

    // 2. Generate nama file unik dengan ekstensi .webp
    const fileName = `${uuidv4()}.webp`;
    const filePath = path.join(uploadDir, fileName);

    // 3. Proses konversi ke WebP menggunakan Sharp
    await sharp(buffer)
      .resize(800) // Resize lebar ke 800px (opsional, agar hemat storage)
      .webp({ quality: 80 }) // Konversi ke WebP dengan kualitas 80%
      .toFile(filePath);

    // 4. Return URL untuk disimpan di database
    return { 
      success: true, 
      url: `/uploads/${fileName}` 
    };
  } catch (error) {
    console.error("UPLOAD_ERROR:", error);
    return { success: false, error: "Gagal memproses gambar" };
  }
}