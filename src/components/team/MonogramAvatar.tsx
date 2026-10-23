import { cn } from "@/lib/utils";

interface MonogramAvatarProps {
  name: string;
  className?: string;
  size?: "card" | "dialog" | "xs";
}

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function MonogramAvatar({ name, className, size = "card" }: MonogramAvatarProps) {
  const textClass =
    size === "dialog" ? "text-2xl" : size === "xs" ? "text-[11px]" : "text-4xl";

  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.03)]",
        className,
      )}
      aria-hidden
    >
      <span
        className={cn(
          "font-syne font-extrabold tracking-tight text-white/70",
          textClass,
        )}
      >
        {getInitials(name)}
      </span>
    </div>
  );
}
