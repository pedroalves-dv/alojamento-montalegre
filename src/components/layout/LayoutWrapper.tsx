import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsAppButton from "@/components/ui/FloatingWhatsAppButton";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-[var(--navbar-height)]">{children}</main>
      <Footer />
      <FloatingWhatsAppButton />
    </>
  );
}
