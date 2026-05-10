"use client";

import { usePathname } from "next/navigation";

export default function ConditionalFloatingButton({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // Property pages are /[locale]/[slug] — two segments, slug is not a static route
  const segments = pathname.split("/").filter(Boolean);
  const isPropertyPage =
    segments.length === 2 &&
    !["regiao", "contacto"].includes(segments[1] ?? "");

  if (isPropertyPage) return null;
  return <>{children}</>;
}
