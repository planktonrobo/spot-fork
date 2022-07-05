import { Triplet } from "@react-three/cannon";
import { createContext, RefObject, Ref } from "react";
import { Object3D } from "three";

interface AppContext {
  [0]: Ref<THREE.Object3D<THREE.Event>>;
  [1]: {
    args: Triplet;
  };
}

const context = createContext<AppContext | undefined>(undefined);

export default context;
