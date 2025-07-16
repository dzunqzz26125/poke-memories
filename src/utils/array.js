export function shuffled(list) {
  return list.sort(() => Math.random() - 0.5);
}
