import { Triplet } from "@react-three/cannon";
import React from "react";

type Props = {
  children: React.ReactNode;
  transparent: boolean;
  opacity: number;
  color: string;
  args: Triplet;
};

const BoxShape = React.forwardRef<any, Props>(
  (
    {
      children,
      transparent = false,
      opacity = 1,
      color = "white",
      args = [1, 1, 1],
      ...props
    },
    ref
  ) => {
    return (
      <mesh receiveShadow castShadow ref={ref} {...props}>
        <boxGeometry args={args} />
        <meshStandardMaterial
          color={color}
          transparent={transparent}
          opacity={opacity}
        />
        {children}
      </mesh>
    );
  }
);

export default BoxShape;
