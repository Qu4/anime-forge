"use client";

import { useEffect, useRef } from "react";

export function MouseGlow() {
  const glowRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    function handlePointerMove(event: PointerEvent) {
      if (frameRef.current !== null) return;

      frameRef.current = requestAnimationFrame(() => {
        const glow = glowRef.current;
        if (!glow) return;

        glow.style.setProperty("--mouse-x", `${event.clientX}px`);
        glow.style.setProperty("--mouse-y", `${event.clientY}px`);

        frameRef.current = null;
      });
    }

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);

      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed inset-0 z-[4] opacity-80"
      style={{
        "--mouse-x": "50vw",
        "--mouse-y": "50vh",
        background:
          "radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(168,85,247,0.22) 0px, rgba(168,85,247,0.12) 90px, rgba(34,211,238,0.06) 170px, transparent 310px)",
      } as React.CSSProperties}
    />
  );
}