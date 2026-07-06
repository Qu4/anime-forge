"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const latestPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    function moveCursor() {
      const currentCursor = cursorRef.current;
      if (!currentCursor) return;

      currentCursor.style.transform = `translate3d(${latestPosition.current.x}px, ${latestPosition.current.y}px, 0)`;
      frameRef.current = null;
    }

    function handlePointerMove(event: PointerEvent) {
      latestPosition.current = {
        x: event.clientX,
        y: event.clientY,
      };

      cursor.classList.add("custom-cursor-visible");

      const target = event.target as HTMLElement | null;
      const isInteractive = target?.closest(
        "button, a, input, textarea, select, [role='button']"
      );

      if (isInteractive) {
        cursor.classList.add("custom-cursor-hovering");
      } else {
        cursor.classList.remove("custom-cursor-hovering");
      }

      if (frameRef.current === null) {
        frameRef.current = requestAnimationFrame(moveCursor);
      }
    }

    function handlePointerDown() {
      cursor.classList.add("custom-cursor-pressed");
    }

    function handlePointerUp() {
      cursor.classList.remove("custom-cursor-pressed");
    }

    function handlePointerLeave() {
      cursor.classList.remove("custom-cursor-visible");
    }

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("pointerdown", handlePointerDown, {
      passive: true,
    });
    window.addEventListener("pointerup", handlePointerUp, {
      passive: true,
    });
    document.addEventListener("mouseleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      document.removeEventListener("mouseleave", handlePointerLeave);

      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor pointer-events-none fixed left-0 top-0 z-[9999]"
      aria-hidden="true"
    >
      <div className="custom-cursor-ring" />
      <div className="custom-cursor-core" />
    </div>
  );
}