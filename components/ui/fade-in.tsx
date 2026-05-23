import { cn } from "@/lib/utils";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
}

export function FadeIn({ children, className }: FadeInProps) {
  return (
    <div
      className={cn(
        "fade-in slide-in-from-bottom-12 animate-in fill-mode-both duration-700 ease-out print:animate-none",
        className,
      )}
    >
      {children}
    </div>
  );
}
