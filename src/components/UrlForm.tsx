interface UrlFormProps {
  value: string;
  onChange: (value: string) => void;
}

export default function UrlForm({
  value,
  onChange,
}: UrlFormProps) {
  return (
    <div>
      <input
        type="text"
        placeholder="https://example.com"
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
      />
    </div>
  );
}