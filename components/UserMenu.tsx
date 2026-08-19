"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

type Props = {
  name?: string | null;
  direction?: "up" | "down";
  className?: string;
};

export function UserMenu({ name, direction = "down", className }: Props) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const displayName = name ?? "Guest";

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();

    setOpen(false);
    router.push("/login");
  }

  return (
    <div ref={menuRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={cn(
          "flex w-full items-center justify-between gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground transition-colors duration-200 hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        )}
      >
        <span className="flex items-center gap-2">
          <User className="size-4 text-muted-foreground" />
          <span className="font-medium">{displayName}</span>
        </span>
        <ChevronUp className="size-4 text-muted-foreground" />
      </button>

      {open && (
        <div
          className={cn(
            "absolute left-0 z-10 w-full min-w-48 rounded-md border border-border bg-card p-1 shadow-md",
            direction === "up" ? "bottom-full mb-2" : "top-full mt-2",
          )}
        >
          <div className="px-3 py-2 text-sm font-medium text-foreground">{displayName}</div>
          <div className="my-1 border-t border-border" />
          <button
            type="button"
            onClick={handleLogout}
            className="w-full rounded-sm px-3 py-2 text-left text-sm text-destructive transition-colors duration-200 hover:bg-muted"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
