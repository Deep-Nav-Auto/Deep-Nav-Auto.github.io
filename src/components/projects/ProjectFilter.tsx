"use client";

import { cn } from "@/lib/utils";

interface ProjectFilterProps {
  categories: string[];
  active: string;
  onChange: (category: string) => void;
}

export function ProjectFilter({
  categories,
  active,
  onChange,
}: ProjectFilterProps) {
  const options = ["all", ...categories];

  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {options.map((cat) => (
        <button
          key={cat}
          type="button"
          onClick={() => onChange(cat)}
          className={cn(
            "rounded-full px-4 py-1.5 text-sm capitalize transition-colors",
            active === cat
              ? "bg-[var(--theme-color)] text-white"
              : "border border-[var(--divider)] text-[var(--text-muted)] hover:bg-[var(--card-bg)]",
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
