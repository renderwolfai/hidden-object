"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { initGA, pageview } from "@/lib/analytics";

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Initialize GA
    initGA();
  }, []);

  useEffect(() => {
    // Track page views when route changes
    const url = pathname + searchParams.toString();
    pageview(url);
  }, [pathname, searchParams]);

  return <>{children}</>;
}
