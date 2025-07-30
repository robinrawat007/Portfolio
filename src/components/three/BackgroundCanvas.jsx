import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

export default function BackgroundCanvas() {
  return (
    <Canvas
      className="fixed inset-0 z-0"
      camera={{ position: [0, 0, 5], fov: 75 }}
    >
      <ambientLight intensity={0.5} />
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
    </Canvas>
  );
}
