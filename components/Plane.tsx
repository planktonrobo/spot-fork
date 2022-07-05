import { Ref } from "react";
import { PlaneProps, Triplet, usePlane } from "@react-three/cannon";
import { Group } from "three";
interface PlaneArgs extends PlaneProps {
  args?:
    | [
        width?: number | undefined,
        height?: number | undefined,
        widthSegments?: number | undefined,
        heightSegments?: number | undefined
      ]
    | undefined;
}

const Plane = ({ args, ...props }: PlaneArgs) => {
  const [ref, api]: [Ref<Group>, any] = usePlane(() => ({
    type: "Static",
    // collisionFilterGroup: GROUP_GROUND,
    ...props,
  }));
  return (
    <group ref={ref}>
      <mesh>
        <planeGeometry args={args} />
        <meshBasicMaterial color="#ffb385" />
      </mesh>
      <mesh receiveShadow>
        <planeGeometry args={args} />
        <shadowMaterial color="lightsalmon" />
      </mesh>
    </group>
  );
};

export default Plane;
