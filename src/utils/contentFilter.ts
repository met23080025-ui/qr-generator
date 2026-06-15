const bannedWords = [
  "porn",
  "xxx",
  "adult",
  "sex",
];

export function containsNSFW(
  content: string
) {
  return bannedWords.some((word) =>
    content
      .toLowerCase()
      .includes(word)
  );
}