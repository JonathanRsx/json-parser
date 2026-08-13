import type { InputHTMLAttributes } from "react";

export function Input({
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`px-2 py-1 text-sm border h-8 border-black bg-white rounded-none focus:outline-none focus:ring-2 focus:ring-lime-400 ${className}`}
      {...props}
    />
  );
}
