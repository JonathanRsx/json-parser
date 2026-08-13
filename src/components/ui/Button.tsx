import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "default" | "icon";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-lime-400 text-black hover:bg-lime-500",
  secondary:
    "bg-transparent text-black border border-black hover:bg-black/5",
};

const sizeStyles: Record<ButtonSize, string> = {
  default: "px-3 py-1.5",
  icon: "w-8 h-8 p-0 flex items-center justify-center shrink-0",
};

export function Button({
  variant = "primary",
  size = "default",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`text-sm font-semibold rounded-none disabled:opacity-40 disabled:cursor-not-allowed transition-colors ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    />
  );
}
