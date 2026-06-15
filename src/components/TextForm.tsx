interface TextFormProps {
  value: string;
  onChange: (value: string) => void;
}

export default function TextForm({
  value,
  onChange,
}: TextFormProps) {
  return (
    <input
      type="text"
      placeholder="Enter text"
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
    />
  );
}