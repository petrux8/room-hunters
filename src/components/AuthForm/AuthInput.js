export default function AuthInput({
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  required = true,
}) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-4 py-2 border rounded"
    />
  );
}
