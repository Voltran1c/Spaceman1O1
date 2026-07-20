import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import useInView from "../lib/useInView";
import usePrefersReducedMotion from "../lib/usePrefersReducedMotion";

const Planet = ({ color }) => (
  <group>
    <mesh>
      <sphereGeometry args={[0.85, 32, 32]} />
      <MeshDistortMaterial
        color={color}
        distort={0.15}
        speed={1.2}
        roughness={0.35}
        metalness={0.4}
      />
    </mesh>
    <mesh rotation={[Math.PI / 2.3, 0.3, 0]}>
      <torusGeometry args={[1.45, 0.07, 16, 64]} />
      <meshStandardMaterial
        color={color}
        roughness={0.4}
        metalness={0.7}
        transparent
        opacity={0.8}
      />
    </mesh>
  </group>
);

const Satellite = ({ color }) => (
  <group rotation={[0.25, 0.5, 0]}>
    <mesh>
      <boxGeometry args={[0.7, 0.7, 0.7]} />
      <meshStandardMaterial color={color} roughness={0.3} metalness={0.6} />
    </mesh>
    <mesh position={[-1.25, 0, 0]}>
      <boxGeometry args={[1.15, 0.55, 0.05]} />
      <meshStandardMaterial
        color={color}
        roughness={0.2}
        metalness={0.8}
        transparent
        opacity={0.8}
      />
    </mesh>
    <mesh position={[1.25, 0, 0]}>
      <boxGeometry args={[1.15, 0.55, 0.05]} />
      <meshStandardMaterial
        color={color}
        roughness={0.2}
        metalness={0.8}
        transparent
        opacity={0.8}
      />
    </mesh>
    <mesh position={[0, 0.55, 0.15]} rotation={[0.4, 0, 0]}>
      <cylinderGeometry args={[0.02, 0.02, 0.7, 8]} />
      <meshStandardMaterial color={color} roughness={0.2} metalness={0.9} />
    </mesh>
    <mesh position={[0, 0.9, 0.4]}>
      <sphereGeometry args={[0.08, 12, 12]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.7}
      />
    </mesh>
  </group>
);

const Asteroid = ({ color }) => {
  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.05, 1);
    const position = geo.attributes.position;
    for (let i = 0; i < position.count; i += 1) {
      const jitter = 0.14;
      position.setXYZ(
        i,
        position.getX(i) + (Math.random() - 0.5) * jitter,
        position.getY(i) + (Math.random() - 0.5) * jitter,
        position.getZ(i) + (Math.random() - 0.5) * jitter
      );
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color={color} roughness={1} metalness={0.1} flatShading />
    </mesh>
  );
};

const Comet = ({ color }) => (
  <group rotation={[0, 0, Math.PI / 5]}>
    <mesh position={[0, 0.6, 0]}>
      <icosahedronGeometry args={[0.42, 1]} />
      <meshStandardMaterial
        color={color}
        roughness={0.4}
        metalness={0.3}
        emissive={color}
        emissiveIntensity={0.35}
      />
    </mesh>
    <mesh position={[0, -0.55, 0]}>
      <coneGeometry args={[0.4, 1.9, 20, 1, true]} />
      <meshStandardMaterial
        color={color}
        roughness={0.6}
        transparent
        opacity={0.32}
        side={THREE.DoubleSide}
      />
    </mesh>
  </group>
);

const Ufo = ({ color }) => (
  <group>
    <mesh scale={[1, 0.35, 1]}>
      <sphereGeometry args={[1.1, 32, 16]} />
      <meshStandardMaterial color={color} roughness={0.25} metalness={0.7} />
    </mesh>
    <mesh position={[0, 0.25, 0]}>
      <sphereGeometry
        args={[0.55, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2]}
      />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.5}
        roughness={0.1}
        metalness={0.2}
      />
    </mesh>
    <mesh position={[0, -0.05, 0]}>
      <torusGeometry args={[1.05, 0.05, 12, 40]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.6}
      />
    </mesh>
  </group>
);

const inViewOptions = { rootMargin: "100px", threshold: 0.1 };

const shapeComponents = {
  planet: Planet,
  satellite: Satellite,
  crystal: Asteroid,
  comet: Comet,
  ring: Ufo,
};

const Spinner = ({ shape, color, spin }) => {
  const ref = useRef(null);
  const ShapeComponent = shapeComponents[shape] || Planet;

  useFrame((_, delta) => {
    if (!ref.current || !spin) return;
    ref.current.rotation.y += delta * 0.5;
    ref.current.rotation.x += delta * 0.2;
  });

  return (
    <group ref={ref}>
      <ShapeComponent color={color} />
    </group>
  );
};

const SectionOrb = ({ shape = "planet", color = "#64ffda", size }) => {
  const [ref, isInView] = useInView(inViewOptions);
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div
      ref={ref}
      className="section-orb"
      style={size ? { width: size, height: size } : undefined}
      aria-hidden="true"
    >
      {isInView && (
        <Canvas camera={{ position: [0, 0, 3.2], fov: 45 }} dpr={[1, 1.5]}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.7} />
            <pointLight position={[3, 3, 3]} intensity={1.4} color={color} />
            <pointLight position={[-3, -2, -2]} intensity={0.6} color="#ffffff" />
            <Float
              speed={prefersReducedMotion ? 0 : 1.5}
              rotationIntensity={prefersReducedMotion ? 0 : 0.6}
              floatIntensity={prefersReducedMotion ? 0 : 1.2}
            >
              <Spinner shape={shape} color={color} spin={!prefersReducedMotion} />
            </Float>
          </Suspense>
        </Canvas>
      )}
    </div>
  );
};

export default SectionOrb;
