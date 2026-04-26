import Image from "next/image";

type Props = {
  variant?: "dark" | "light";
  className?: string;
};

export default function AlojamentoLogo({
  variant = "dark",
  className = "",
}: Props) {
  return (
    <Image
      src="/logo.png"
      alt="Alojamento Montalegre"
      width={280}
      height={60}
      className={className}
      style={variant === "light" ? { filter: "brightness(0) invert(1)" } : undefined}
      priority
    />
  );
}
