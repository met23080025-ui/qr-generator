interface EmailFormProps {
  value: string;
  onChange: (value: string) => void;
}

export default function EmailForm({
  value,
  onChange,
}: EmailFormProps) {
  return (
    <input
      type="email"
      placeholder="user@email.com"
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
    />
  );
}