// src/components/ShaderBackground.jsx
import { Canvas } from '@react-three/fiber';
import SpaceStation3D from './SpaceStation3D';
import Asteroid3D from './Asteroid3D';

export default function ShaderBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1]">
      <Canvas camera={{ position: [0, 0, 100], fov: 60 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        
        {/* Space Station */}
        <SpaceStation3D position={[60, 30, -40]} />
        
        {/* Asteroid Field */}
        <Asteroid3D position={[-40, 20, -30]} size={2} />
        <Asteroid3D position={[70, -25, -50]} size={1.5} />
        <Asteroid3D position={[-60, -30, -35]} size={1.8} />
        <Asteroid3D position={[45, 40, -60]} size={1.2} />
        <Asteroid3D position={[-30, 50, -45]} size={2.2} />
        
        {/* Distant objects */}
        <Asteroid3D position={[100, 60, -80]} size={0.8} />
        <Asteroid3D position={[-80, -60, -70]} size={1} />
      </Canvas>
    </div>
  );
}