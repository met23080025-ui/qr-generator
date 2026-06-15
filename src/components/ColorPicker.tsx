interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function ColorPicker({
  value,
  onChange,
}: Props) {
  return (
    <div>
      <label>QR Color</label>

      <br />

      <input
        type="color"
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
      />
    </div>
  );
}