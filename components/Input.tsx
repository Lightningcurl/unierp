import React from "react";

type Props = {
  label: string;
  value: string;
  placeholder?: string,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
  type?: string;
  min?: number;
  max?: number;
};

export function Input({ label, value,placeholder, onChange, errorMessage, type = "text", min, max }: Props) {
  return (
    <div>
      <label>{label}</label>
      <input
        placeholder={placeholder}
        type={type}
        min={min}
        max={max}
        value={value}
        onChange={onChange}
      />
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}