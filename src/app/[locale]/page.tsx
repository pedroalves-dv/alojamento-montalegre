import { setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex-1 flex items-center justify-center min-h-[60vh]">
      <h1 className="font-serif text-4xl text-forest">Alojamento Montalegre</h1>
    </main>
  );
}
