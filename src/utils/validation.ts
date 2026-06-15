import type {
  QRType,
  WifiConfig,
} from "../types/qr";

const bannedWords = [
  // English NSFW
  "porn",
  "porno",
  "pornhub",
  "xxx",
  "sex",
  "sexy",
  "nude",
  "naked",
  "adult",
  "18+",
  "nsfw",
  "onlyfans",
  "fuck",
  "fck",
  "fuk",
  "shit",
  "bitch",
  "dick",
  "cock",
  "pussy",
  "blowjob",
  "handjob",

  // Vietnamese
  "địt",
  "dit",
  "đụ",
  "du",
  "đéo",
  "deo",
  "lồn",
  "lon",
  "cặc",
  "cac",
  "buồi",
  "buoi",
  "đm",
  "dm",
  "vcl",
  "vl",
  "cl",
  "cc",
];

function normalizeText(
  text: string
): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9à-ỹ]/g, "")
    .replace(/0/g, "o")
    .replace(/1/g, "i")
    .replace(/3/g, "e")
    .replace(/4/g, "a")
    .replace(/5/g, "s")
    .replace(/7/g, "t");
}

export function containsNSFW(
  content: string
): boolean {
  const normalized =
    normalizeText(content);

  return bannedWords.some((word) =>
    normalized.includes(word)
  );
}

export function validateQR(
  type: QRType,
  value: string,
  wifi?: WifiConfig
): boolean {
  // Chặn nội dung 18+
  if (containsNSFW(value)) {
    return false;
  }

  switch (type) {
    case "url":
      return /^https?:\/\/.+/.test(
        value
      );

    case "email":
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        value.replace(
          "mailto:",
          ""
        )
      );

    case "phone":
      return /^\+?[0-9]{8,15}$/.test(
        value.replace("tel:", "")
      );

    case "text":
      return (
        value.trim().length > 0
      );

    case "wifi":
      return (
        !!wifi &&
        wifi.ssid.trim() !== "" &&
        !containsNSFW(
          wifi.ssid
        ) &&
        !containsNSFW(
          wifi.password
        )
      );

    default:
      return false;
  }
}