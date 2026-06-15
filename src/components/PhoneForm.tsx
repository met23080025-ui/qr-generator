interface PhoneFormProps {
  value: string;
  onChange: (value: string) => void;
}

export default function PhoneForm({
  value,
  onChange,
}: PhoneFormProps) {
  return (
    <input
      type="tel"
      placeholder="+84901234567"
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
    />
  );
}