import React, { MutableRefObject, useRef, useContext } from "react";
import { Object3D } from "three";
import context from "../context/robot";
import ConstraintPart from "./ConstraintPart";

type Props = {
  name: string;
  delay: number;
  hipAngle: number;
  kneeAngle: number;
  motorSpeed: number;
};

const Leg = React.forwardRef<
  MutableRefObject<Object3D<Event>> | undefined,
  Props
>(
  (
    {
      name,
      delay = 0,
      hipAngle = -50,
      kneeAngle = -90,
      motorSpeed = 7,
      ...props
    },
    ref
  ) => {
    const body = useContext(context);

    const upperRef = useRef();
    const lowerRef = useRef();

    const hipAngleRef = useRef(hipAngle);
    const kneeAngleRef = useRef(kneeAngle);
    return (
      <group {...props}>
        <ConstraintPart
          ref={upperRef}
          args={[1, 4, 1]}
          parentPivot={[0, 0, 0]}
          pivot={[0, 0.5, -0.6]}
          position={[0, 0, 0]}
          enableMotor
          color="#d19807"
          {...props}
        >
          <ConstraintPart
            ref={lowerRef}
            args={[0.4, 4, 0.8]}
            pivot={[0.5, -0.5, 0]}
            parentPivot={[-0.5, -0.5, 0]}
            position={[0, 0, 0]}
            enableMotor
            motorMaxForce={8}
            rotation={[0, 0, Math.PI / 2]}
            color="#000"
          ></ConstraintPart>
        </ConstraintPart>
      </group>
    );
  }
);

export default Leg