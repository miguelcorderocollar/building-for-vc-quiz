"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Logo({ className }: { className?: string }) {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={className}>
        <div className="w-4 h-5 bg-gray-400 rounded-sm" />
      </div>
    );
  }

  const currentTheme = theme === "system" ? systemTheme : theme;
  const logoSrc = currentTheme === "dark" ? "/logo/icon-dark.svg" : "/logo/icon-light.svg";

  return (
    <div className={className || ""}>
      <Image
        src={logoSrc}
        alt="Building for VC"
        width={16}
        height={20}
        priority
        className="h-full w-auto"
      />
    </div>
  );
}
