export const formatUaPhone = (raw: string) => {
  if (!raw.startsWith("380") || raw.length !== 12) return raw;

  const code = raw.slice(2, 5);
  const part1 = raw.slice(5, 8);
  const part2 = raw.slice(8, 10);
  const part3 = raw.slice(10, 13);

  return `+38 (${code}) ${part1}-${part2}-${part3}`;
};
