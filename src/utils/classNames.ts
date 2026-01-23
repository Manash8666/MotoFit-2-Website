export function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}
