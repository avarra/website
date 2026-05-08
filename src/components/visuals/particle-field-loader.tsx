"use client";

import dynamic from "next/dynamic";

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
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <ParticleFieldFallback />
      <ParticleFieldScene />
    </div>
  );
}

function ParticleFieldFallback() {
  return (
    <div className="technical-grid absolute inset-0 opacity-70">
      <div className="fine-dots absolute inset-0 opacity-35" />
      <div className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-(--line) opacity-50" />
    </div>
  );
}
