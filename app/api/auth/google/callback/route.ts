import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { createSession } from "@/lib/auth/session"; // Sesuaikan path ini dengan milik Anda

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");

    // Jika pengguna membatalkan login
    if (!code) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    const clientId = process.env.GOOGLE_CLIENT_ID!;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET!;
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/google/callback`;

    try {
        // 1. Tukar 'code' dengan Access Token dari Google
        const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                code,
                client_id: clientId,
                client_secret: clientSecret,
                redirect_uri: redirectUri,
                grant_type: "authorization_code",
            }),
        });
        const tokenData = await tokenResponse.json();

        // 2. Ambil data profil pengguna menggunakan Access Token
        const userResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
            headers: { Authorization: `Bearer ${tokenData.access_token}` },
        });
        const googleUser = await userResponse.json();

        // 3. Cek apakah pengguna sudah ada di Database
        let user = await prisma.user.findUnique({
            where: { email: googleUser.email },
        });

        // 4. Jika belum ada, daftarkan otomatis (Sign Up)
        if (!user) {
            user = await prisma.user.create({
                data: {
                    name: googleUser.name,
                    email: googleUser.email,
                    role: "student", // Default role
                    // Kolom password dibiarkan kosong (null)
                }
            });
        }

        // 5. Buat Sesi Login (Memanfaatkan fungsi buatan Anda sebelumnya)
        await createSession(user.id);

        // 6. Arahkan ke dashboard sesuai role
        const redirectPath = 
            user.role === "admin" ? "/admin/dashboard" : 
            user.role === "mentor" ? "/mentor/dashboard" : 
            "/student/dashboard";

        return NextResponse.redirect(new URL(redirectPath, request.url));

    } catch (error) {
        console.error("Google OAuth Error:", error);
        return NextResponse.redirect(new URL("/sign-in?error=google_failed", request.url));
    }
}