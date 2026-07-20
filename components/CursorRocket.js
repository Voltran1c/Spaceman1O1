import { useEffect, useRef } from "react";

const HOTSPOT_X = 8;
const HOTSPOT_Y = 4;

const CursorRocket = () => {
  const rocketRef = useRef(null);
  const target = useRef({ x: 0, y: 0 });
  const rendered = useRef({ x: 0, y: 0 });
  const frame = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return undefined;

    const handleMove = (event) => {
      target.current.x = event.clientX;
      target.current.y = event.clientY;
      if (rocketRef.current) rocketRef.current.style.opacity = "1";
    };

    const handleLeave = () => {
      if (rocketRef.current) rocketRef.current.style.opacity = "0";
    };

    const tick = () => {
      rendered.current.x += (target.current.x - rendered.current.x) * 0.35;
      rendered.current.y += (target.current.y - rendered.current.y) * 0.35;
      if (rocketRef.current) {
        rocketRef.current.style.transform = `translate3d(${
          rendered.current.x - HOTSPOT_X
        }px, ${rendered.current.y - HOTSPOT_Y}px, 0)`;
      }
      frame.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);
    frame.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <div ref={rocketRef} className="cursor-rocket" aria-hidden="true">
      <svg width="32" height="46" viewBox="0 0 32 46">
        <g transform="rotate(-35 16 16)">
          <path
            className="cursor-rocket__flame cursor-rocket__flame--outer"
            d="M10.5 21 L21.5 21 L16 45 Z"
            fill="#ff8a3d"
          />
          <path
            className="cursor-rocket__flame cursor-rocket__flame--mid"
            d="M12.5 21 L19.5 21 L16 37 Z"
            fill="#ff5f2e"
          />
          <path
            className="cursor-rocket__flame cursor-rocket__flame--inner"
            d="M14 21 L18 21 L16 29 Z"
            fill="#ffe066"
          />
          <path
            d="M16 2 C21 7 21 17 17 22 L15 22 C11 17 11 7 16 2 Z"
            fill="#f4f6ff"
            stroke="#14172c"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <circle
            cx="16"
            cy="11"
            r="2.6"
            fill="#4cc9f0"
            stroke="#14172c"
            strokeWidth="0.8"
          />
          <path
            d="M16 2 C17.6 4.2 17.6 6.4 16 7.6 C14.4 6.4 14.4 4.2 16 2 Z"
            fill="#ff6b6b"
          />
          <path
            d="M11.5 17 L6.5 23 L12 21.5 Z"
            fill="#3a86ff"
            stroke="#14172c"
            strokeWidth="0.8"
            strokeLinejoin="round"
          />
          <path
            d="M20.5 17 L25.5 23 L20 21.5 Z"
            fill="#3a86ff"
            stroke="#14172c"
            strokeWidth="0.8"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  );
};

export default CursorRocket;
