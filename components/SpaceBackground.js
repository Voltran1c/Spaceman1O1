import { Suspense, useContext, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import ShootingStars from "./ShootingStars";
import usePrefersReducedMotion from "../lib/usePrefersReducedMotion";
import { ThemeContext } from "../contexts/theme";

const DriftingRock = ({ position, speed, color, scale = 1, spin }) => {
  const ref = useRef(null);

  useFrame((_, delta) => {
    if (!ref.current || !spin) return;
    ref.current.rotation.x += delta * speed;
    ref.current.rotation.y += delta * speed * 0.6;
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color={color} wireframe roughness={1} />
    </mesh>
  );
};

const SpaceBackground = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { themeName } = useContext(ThemeContext);
  const spin = !prefersReducedMotion;

  return (
    <div className="space-bg" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <pointLight position={[5, 5, 5]} intensity={1.2} color="#64ffda" />
          <Stars
            radius={80}
            depth={50}
            count={3500}
            factor={4}
            saturation={0}
            fade
            speed={prefersReducedMotion ? 0 : 0.6}
          />
          <DriftingRock position={[-4.5, 2.2, -4]} speed={0.15} color="#64ffda" scale={0.9} spin={spin} />
          <DriftingRock position={[4.5, -2, -6]} speed={0.1} color="#3a86ff" scale={1.3} spin={spin} />
          <DriftingRock position={[3, 3.5, -7]} speed={0.2} color="#ff6b9d" scale={0.6} spin={spin} />
          <DriftingRock position={[-3.5, -3, -5]} speed={0.12} color="#b388ff" scale={0.7} spin={spin} />
        </Suspense>
      </Canvas>
      {themeName === "dark" && !prefersReducedMotion && <ShootingStars />}
    </div>
  );
};

export default SpaceBackground;
