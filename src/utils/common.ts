export function formatKey(
  key: string,
  prefixCount: number = 5,
  suffixCount: number = 4,
): string {
  const prefix = key.slice(0, prefixCount);
  const suffix = key.slice(key.length - suffixCount);

  return `${prefix}...${suffix}`;
}
