import Navbar from "@/components/layout/navbar"; // Sesuaikan path jika berbeda
import Footer from "@/components/layout/Footer"; // Sesuaikan path jika berbeda

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}