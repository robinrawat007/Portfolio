import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import RotatingCube from "./RotatingCube";

export default function SceneCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[3, 3, 3]} />
      <OrbitControls enableZoom={false} enablePan={false} />
      <RotatingCube />
    </Canvas>
  );
}
