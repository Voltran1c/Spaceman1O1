import { useEffect, useRef, useState } from "react";
import usePrefersReducedMotion from "../lib/usePrefersReducedMotion";

let uid = 0;

const randomBetween = (min, max) => Math.random() * (max - min) + min;

const createStreak = () => {
  uid += 1;
  const isMeteor = Math.random() < 0.28;
  const angle = randomBetween(18, 55) * (Math.random() < 0.5 ? 1 : -1);
  const travel = isMeteor ? randomBetween(320, 480) : randomBetween(140, 280);
  const duration = isMeteor ? randomBetween(1.1, 1.7) : randomBetween(0.5, 1);

  return {
    id: uid,
    kind: isMeteor ? "meteor" : "star",
    duration,
    style: {
      top: `${randomBetween(2, 55)}%`,
      left: `${randomBetween(5, 92)}%`,
      "--angle": `${angle}deg`,
      "--travel": `${-travel}px`,
      "--duration": `${duration}s`,
    },
  };
};

const ShootingStars = () => {
  const [streaks, setStreaks] = useState([]);
  const prefersReducedMotion = usePrefersReducedMotion();
  const spawnTimeout = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion) return undefined;

    const spawn = () => {
      const streak = createStreak();
      setStreaks((current) => [...current, streak]);

      window.setTimeout(() => {
        setStreaks((current) => current.filter((item) => item.id !== streak.id));
      }, streak.duration * 1000 + 150);

      spawnTimeout.current = window.setTimeout(spawn, randomBetween(2200, 5500));
    };

    spawnTimeout.current = window.setTimeout(spawn, randomBetween(400, 1500));
    return () => window.clearTimeout(spawnTimeout.current);
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <div className="shooting-stars" aria-hidden="true">
      {streaks.map((streak) => (
        <span
          key={streak.id}
          className={`streak streak--${streak.kind}`}
          style={streak.style}
        />
      ))}
    </div>
  );
};

export default ShootingStars;
