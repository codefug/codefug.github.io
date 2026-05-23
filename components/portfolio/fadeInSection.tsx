import { cn } from "@/lib/utils";

interface FadeInSectionProps {
  children: React.ReactNode;
  delay?: number;
  direct?: "up" | "down" | "left" | "right";
  className?: string;
}

const directionClass = {
  up: "fade-in-up",
  down: "fade-in-down",
  left: "fade-in-left",
  right: "fade-in-right",
} as const;

export const FadeInSection = ({
  children,
  delay = 0,
  direct = "up",
  className,
}: FadeInSectionProps) => {
  return (
    <div
      className={cn(directionClass[direct], className)}
      style={delay > 0 ? { animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
};
