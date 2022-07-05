import type { NextPage } from "next";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Scene from "../components/Scene";

const Home: NextPage = () => {
  return (
    <>
      <Canvas shadows gl={{ alpha: false }}>
        <OrbitControls />
        <Scene />
      </Canvas>
      <div className="overlay">
        <pre>*</pre>
      </div>
    </>
  );
};

export default Home;
