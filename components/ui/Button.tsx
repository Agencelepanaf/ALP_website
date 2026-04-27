import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "dark";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  children: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const styles: Record<Variant, string> = {
  primary:
    "bg-accent text-white hover:bg-accent-hover shadow-md shadow-accent/20 active:scale-95",
  secondary:
    "bg-surface text-foreground border border-border hover:bg-background hover:border-foreground/20 active:scale-95",
  dark:
    "bg-dark text-white hover:bg-dark-surface shadow-lg shadow-dark/20 active:scale-95",
  ghost:
    "bg-transparent text-foreground hover:bg-border/60 active:scale-95",
};

const base =
  "inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-full transition-all duration-200 cursor-pointer select-none";

export default function Button({
  href,
  onClick,
  variant = "primary",
  children,
  className = "",
  type = "button",
  disabled = false,
}: ButtonProps) {
  const classes = `${base} ${styles[variant]} ${className} ${disabled ? "opacity-50 pointer-events-none" : ""}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
