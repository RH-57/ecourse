import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session"; // Sesuaikan dengan path Anda

export async function authIsNotRequired() {
  const user = await getCurrentUser();

  if (user) {
    // Arahkan ke dashboard yang tepat sesuai peran (role)
    if (user.role === "admin") {
      redirect("/admin/dashboard");
    } else if (user.role === "mentor") {
      redirect("/mentor/dashboard");
    } else {
      // Default untuk STUDENT
      redirect("/student/dashboard");
    }
  }
}