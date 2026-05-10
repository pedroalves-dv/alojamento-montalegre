import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsAppButton from "@/components/ui/FloatingWhatsAppButton";
import ConditionalFloatingButton from "@/components/ui/ConditionalFloatingButton";

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
      <ConditionalFloatingButton>
        <FloatingWhatsAppButton />
      </ConditionalFloatingButton>
    </>
  );
}
