/** Prefix a public-file path with the Vite/vinext base (GitHub Pages lives under /playful-os-preview/). */
export function publicAsset(path: string): string {
  const base = import.meta.env.BASE_URL ?? "/";
  return `${base}${path.replace(/^\//, "")}`;
}
