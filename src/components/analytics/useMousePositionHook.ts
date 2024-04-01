import { useState, useEffect, RefObject } from "react";

type MousePosition = {
  x: number;
  y: number;
}

export const useMousePosition = (targetRef: RefObject<HTMLDivElement>) => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

  const handleMouseMove = (e: { clientX: number; clientY: number; }) => {
    const rect = targetRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePosition(({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }));
    }
  }
    
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [])

  return mousePosition;
}