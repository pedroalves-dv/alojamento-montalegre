import { Instrument_Serif } from "next/font/google";
import localFont from "next/font/local";

export const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});

// variable name differs from the @theme token (--font-stack) to avoid self-reference
export const stack = localFont({
  src: "../fonts/stack_regular.woff2",
  variable: "--font-stack-local",
  display: "swap",
});
