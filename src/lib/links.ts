import { config } from "@/config";

export function whatsappHref(message?: string) {
  const base = `https://wa.me/${config.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function telHref(phone: string = config.phoneNumber) {
  return `tel:${phone.replace(/\s/g, "")}`;
}

export function absoluteUrl(path: string) {
  return new URL(path, config.siteUrl).href;
}
