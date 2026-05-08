"use client";

import { forwardRef } from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  asChild?: false;
}

interface AnchorButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  asChild: true;
  href: string;
}

type Props = ButtonProps | AnchorButtonProps;

const baseClasses =
  "inline-flex items-center justify-center gap-2 font-semibold uppercase tracking-[0.08em] rounded text-sm transition-all duration-150 ease-in-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c41e1e] disabled:opacity-40 disabled:cursor-not-allowed select-none cursor-pointer min-h-[48px]";

const variantClasses = {
  primary:
    "bg-[#c41e1e] text-[#0a0a0a] px-7 py-[14px] hover:bg-[#a01818] hover:scale-[1.02] active:scale-[0.98] active:bg-[#a01818]",
  secondary:
    "bg-transparent border-2 border-[#f5f5f5] text-[#f5f5f5] px-7 py-[14px] hover:border-[#c41e1e] hover:text-[#c41e1e] active:scale-[0.98]",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size: _size, loading, children, className = "", disabled, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        {...props}
      >
        {loading ? <Loader2 size={16} className="animate-spin" /> : children}
      </button>
    );
  }
);

Button.displayName = "Button";

export function LinkButton({
  variant = "primary",
  children,
  className = "",
  href,
  ...props
}: AnchorButtonProps) {
  return (
    <a
      href={href}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
