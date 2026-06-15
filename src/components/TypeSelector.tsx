import type { QRType } from "../types/qr";

interface TypeSelectorProps {
  value: QRType;
  onChange: (value: QRType) => void;
}

export default function TypeSelector({
  value,
  onChange,
}: TypeSelectorProps) {
  return (
    <div>
      <label>Content Type</label>

      <br />

      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value as QRType)
        }
      >
        <option value="url">URL</option>
        <option value="text">Text</option>
        <option value="email">Email</option>
        <option value="phone">Phone</option>
        <option value="wifi">WiFi</option>
      </select>
    </div>
  );
}