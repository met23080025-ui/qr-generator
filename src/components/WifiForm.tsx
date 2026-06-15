import type { WifiConfig } from "../types/qr";

interface Props {
  value: WifiConfig;
  onChange: (value: WifiConfig) => void;
}

export default function WifiForm({
  value,
  onChange,
}: Props) {
  return (
    <div>
      <input
        placeholder="Network Name"
        value={value.ssid}
        onChange={(e) =>
          onChange({
            ...value,
            ssid: e.target.value,
          })
        }
      />

      <br />

      <input
        placeholder="Password"
        value={value.password}
        onChange={(e) =>
          onChange({
            ...value,
            password: e.target.value,
          })
        }
      />

      <br />

      <select
        value={value.encryption}
        onChange={(e) =>
          onChange({
            ...value,
            encryption: e.target
              .value as WifiConfig["encryption"],
          })
        }
      >
        <option value="WPA">WPA/WPA2</option>
        <option value="WEP">WEP</option>
        <option value="nopass">
          No Password
        </option>
      </select>
    </div>
  );
}