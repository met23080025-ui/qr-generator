export type QRType =
  | "url"
  | "text"
  | "email"
  | "phone"
  | "wifi";

export interface WifiConfig {
  ssid: string;
  password: string;
  encryption: "WPA" | "WEP" | "nopass";
}