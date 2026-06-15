interface Props {
  value: number;
  onChange: (value: number) => void;
}

export default function SizeSelector({
  value,
  onChange,
}: Props) {
  return (
    <div>
      <label>QR Size</label>

      <br />

      <select
        value={value}
        onChange={(e) =>
          onChange(Number(e.target.value))
        }
      >
        <option value={150}>150</option>
        <option value={200}>200</option>
        <option value={300}>300</option>
        <option value={400}>400</option>
        <option value={500}>500</option>
      </select>
    </div>
  );
}