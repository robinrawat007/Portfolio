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
        radius={200}
        depth={60}
        count={10000}
        factor={7}
        saturation={0}
        fade
        speed={0}
      />
    </Canvas>
  );
}
