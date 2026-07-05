"use client";

import { useEffect, useRef } from "react";

export function MouseGlow() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let frame = 0;

    function handleMouseMove(event: MouseEvent) {
      if (frame) return;

      frame = requestAnimationFrame(() => {
        if (ref.current) {
          ref.current.style.transform = `translate3d(${event.clientX - 220}px, ${event.clientY - 220}px, 0)`;
        }

        frame = 0;
      });
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute left-0 top-0 h-[360px] w-[360px] rounded-full bg-purple-500/12 blur-[70px] will-change-transform"
    />
  );
}