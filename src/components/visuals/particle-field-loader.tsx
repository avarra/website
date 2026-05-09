"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ParticleFieldScene = dynamic(
  () =>
    import("./particle-field-scene").then(
      (module) => module.ParticleFieldScene,
    ),
  {
    ssr: false,
    loading: () => <ParticleFieldFallback />,
  },
);

export function ParticleField() {
  const shouldRenderScene = useAllowsMotion();

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <ParticleFieldFallback />
      {shouldRenderScene ? <ParticleFieldScene /> : null}
    </div>
  );
}

function useAllowsMotion() {
  const [allowsMotion, setAllowsMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setAllowsMotion(!mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return allowsMotion;
}

function ParticleFieldFallback() {
  return (
    <div className="topographic-fallback absolute inset-0 opacity-80">
      <div className="topographic-dots absolute inset-0" />
      <div className="signal-ridge absolute inset-x-[-8%] bottom-[10%] h-32 rotate-[-4deg]" />
      <div className="signal-ridge signal-ridge-muted absolute inset-x-[-12%] top-[18%] h-28 rotate-[7deg]" />
    </div>
  );
}
