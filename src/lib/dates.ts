/** The next Friday the 13th on or after `from` (today counts). */
export function nextFriday13(from = new Date()): Date {
  const today = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  for (let month = today.getMonth(); ; month++) {
    const date = new Date(today.getFullYear(), month, 13);
    if (date.getDay() === 5 && date >= today) return date;
  }
}

/** "2026-11-13", for <time datetime>. */
export const isoDate = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
