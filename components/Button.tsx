import React from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  variant: "primary" | "secondary" | "destructive" | "loading" | "disabled";
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
};

const variantStyles = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary: "bg-transparent text-primary border border-primary hover:bg-primary/10",
  destructive: "bg-destructive text-white hover:bg-destructive/90",
  loading: "bg-primary/40 text-primary-foreground cursor-wait",
  disabled: "bg-muted text-muted-foreground cursor-not-allowed",
};

export function Button({ children, variant, type = "button", onClick, className }: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={variant === "loading" || variant === "disabled"}
      className={cn(
        "rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200",
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </button>
  );
}
