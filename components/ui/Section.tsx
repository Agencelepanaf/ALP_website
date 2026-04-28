import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: "section" | "div" | "article";
  contained?: boolean;
}

export default function Section({
  children,
  className = "",
  id,
  as: Tag = "section",
  contained = true,
}: SectionProps) {
  return (
    <Tag id={id} className={`px-4 sm:px-6 lg:px-8 py-10 md:py-24 ${className}`}>
      {contained ? (
        <div className="max-w-6xl mx-auto">{children}</div>
      ) : (
        children
      )}
    </Tag>
  );
}
