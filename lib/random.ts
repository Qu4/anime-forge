export function getTwoRandomItems<T>(items: T[]): [T, T] {
  const shuffled = [...items].sort(() => Math.random() - 0.5);

  return [shuffled[0], shuffled[1]];
}