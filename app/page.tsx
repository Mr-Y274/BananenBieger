"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/watch");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500 text-sm">
      <noscript>
        <a href={`${BASE_PATH}/watch/`}>Weiter zu BananenTube →</a>
      </noscript>
      Weiterleitung zu BananenTube…
    </div>
  );
}
