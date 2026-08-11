import React from "react";

type Props = {
    children: React.ReactNode
    variant: "primary" | "secondary" | "destructive" | "loading" | "disabled";
}

const variantStyles = {
  primary: "bg-[#1AF7B6] text-black",
  secondary: "bg-transparent text-[#1AF7B6] border border-[#1AF7B6]",
  destructive: "bg-red-600 text-white",
  loading: "bg-blue-300 text-white cursor-wait",
  disabled: "bg-gray-100 text-gray-400 cursor-not-allowed",
};

export function Button({ children,variant }: Props) {
  return <button className={variantStyles[variant]}>{children}</button>;
}