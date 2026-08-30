"use client";

import { useEffect, useRef } from "react";

const interactiveSelector = "a, button, [data-cursor]";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;

    if (!cursor || !dot || !ring || !label) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let enabled = false;
    let frame = 0;
    let targetX = -100;
    let targetY = -100;
    let ringX = -100;
    let ringY = -100;

    const render = () => {
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      frame = window.requestAnimationFrame(render);
    };

    const updateHoverState = (target: EventTarget | null) => {
      const element = target instanceof Element ? target : null;
      const interactive = element?.closest<HTMLElement>(interactiveSelector);
      const tone = element?.closest<HTMLElement>("[data-cursor-tone]")?.dataset
        .cursorTone;
      const nextLabel = interactive?.dataset.cursorLabel ?? "";

      cursor.classList.toggle("is-active", Boolean(interactive));
      cursor.classList.toggle("is-light", tone === "light");
      cursor.classList.toggle("has-label", Boolean(nextLabel));
      label.textContent = nextLabel;
    };

    const handlePointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
      cursor.classList.add("is-visible");
      updateHoverState(event.target);
    };

    const handlePointerDown = () => cursor.classList.add("is-pressed");
    const handlePointerUp = () => cursor.classList.remove("is-pressed");
    const handlePointerLeave = () => cursor.classList.remove("is-visible");

    const disable = () => {
      if (!enabled) return;
      enabled = false;
      document.documentElement.classList.remove("has-custom-cursor");
      cursor.className = "custom-cursor";
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      document.documentElement.removeEventListener(
        "pointerleave",
        handlePointerLeave,
      );
    };

    const enable = () => {
      if (enabled || !finePointer.matches || reducedMotion.matches) return;
      enabled = true;
      document.documentElement.classList.add("has-custom-cursor");
      window.addEventListener("pointermove", handlePointerMove, {
        passive: true,
      });
      window.addEventListener("pointerdown", handlePointerDown, {
        passive: true,
      });
      window.addEventListener("pointerup", handlePointerUp, { passive: true });
      document.documentElement.addEventListener(
        "pointerleave",
        handlePointerLeave,
      );
      frame = window.requestAnimationFrame(render);
    };

    const updateCapability = () => {
      disable();
      enable();
    };

    finePointer.addEventListener("change", updateCapability);
    reducedMotion.addEventListener("change", updateCapability);
    enable();

    return () => {
      finePointer.removeEventListener("change", updateCapability);
      reducedMotion.removeEventListener("change", updateCapability);
      disable();
    };
  }, []);

  return (
    <div ref={cursorRef} className="custom-cursor" aria-hidden="true">
      <div ref={ringRef} className="custom-cursor__ring">
        <span ref={labelRef} className="custom-cursor__label" />
      </div>
      <div ref={dotRef} className="custom-cursor__dot" />
    </div>
  );
}
