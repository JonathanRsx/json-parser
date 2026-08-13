import type { InputHTMLAttributes } from "react";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

export function Checkbox({ label, className = "", ...props }: CheckboxProps) {
  return (
    <label
      className={`inline-flex items-center gap-1.5 text-xs text-black cursor-pointer select-none ${className}`}
    >
      <span className="relative inline-flex w-3.5 h-3.5 shrink-0">
        <input
          type="checkbox"
          className="peer appearance-none absolute inset-0 w-full h-full m-0 border border-black bg-white checked:bg-lime-400 cursor-pointer"
          {...props}
        />
        {/* checkmark, shown only when the sibling input is checked */}
        <svg
          viewBox="0 0 24 24"
          width="10"
          height="10"
          fill="none"
          stroke="black"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 m-auto hidden peer-checked:block"
        >
          <path d="M5 13l4 4L19 7" />
        </svg>
      </span>
      {label}
    </label>
  );
}
