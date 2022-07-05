import { useRef, Suspense, Ref } from "react";
import { PerspectiveCamera } from "@react-three/drei";
import { Physics, usePlane } from "@react-three/cannon";
import { Group } from "three";
import Plane from "./Plane";
import ConstraintPart from "./ConstraintPart";
import Robot from "./Robot";

const Scene = () => {
  const cameraRef = useRef();
  return (
    <Suspense>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[-40, 10, 20]} />
      <hemisphereLight intensity={0.35} />
      <spotLight
        position={[20, 30, 10]}
        angle={Math.PI / 5}
        penumbra={1}
        intensity={1}
        distance={180}
        castShadow
        shadow-mapSize-width={256}
        shadow-mapSize-height={256}
      />
      <color attach="background" args={["#f6d186"]} />
      <Physics iterations={80} gravity={[0, -40, 0]}>
        <Plane
          args={[120, 120]}
          position={[0, -5, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
        <Robot />
      </Physics>
    </Suspense>
  );
};

export default Scene;

// hemisphere light is a
