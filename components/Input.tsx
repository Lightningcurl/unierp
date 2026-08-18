import React from "react";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  value: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
  type?: string;
  min?: number;
  max?: number;
  required?: boolean;
  className?: string;
};

export function Input({
  label,
  value,
  placeholder,
  onChange,
  errorMessage,
  type = "text",
  min,
  max,
  required,
  className,
}: Props) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label className="text-sm font-medium text-foreground">{label}</label>
      <input
        placeholder={placeholder}
        type={type}
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        required={required}
        className={cn(
          "rounded-md border border-border bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
          errorMessage && "border-destructive",
        )}
      />
      {errorMessage && <p className="text-sm text-destructive">{errorMessage}</p>}
    </div>
  );
}
