import { useFrame } from "@react-three/fiber";
import { forwardRef, useRef } from "react";
import { MathUtils } from "three";
import ConstraintPart from "./ConstraintPart";
import Leg from "./Leg";

const Robot = forwardRef(({ ...props }, ref) => {
  const x = 0;
  const y = 0;

  const leftFrontRef = useRef({});
  const rightBackRef = useRef({});
  const leftBackRef = useRef({});
  const rightFrontRef = useRef({});

  useFrame(({ clock }) => {
    if (!leftFrontRef.current) return;

    // let x = Math.cos(clock.getElapsedTime() * 2) * 2
    // let y = Math.sin(clock.getElapsedTime() * 2)

    let hipAngle = MathUtils.lerp(-90, -10, (y + 1 - x * -1) / 2);
    let kneeAngle = MathUtils.lerp(-10, -160, (y + 1) / 2);

    // // leftFrontRef.current.setHipAngle(hipAngle);
    // // leftFrontRef.current.setKneeAngle(kneeAngle);
    // // rightBackRef.current.setHipAngle(hipAngle);
    // // rightBackRef.current.setKneeAngle(kneeAngle);

    // x = Math.cos(1000 + clock.getElapsedTime() * 2) * 2
    // y = Math.sin(1000 + clock.getElapsedTime() * 2)
    // // other side
    hipAngle = MathUtils.lerp(-90, -10, (y + 1 - x * -1) / 2);
    kneeAngle = MathUtils.lerp(-10, -160, (y + 1) / 2);

    // leftBackRef.current.setHipAngle(hipAngle);
    // leftBackRef.current.setKneeAngle(kneeAngle);
    // rightFrontRef.current.setHipAngle(hipAngle);
    // rightFrontRef.current.setKneeAngle(kneeAngle);
  });

  return (
    <group {...props}>
      <ConstraintPart
        mass={1}
        position={[0, 5, 0]}
        args={[12, 2, 4]}
        pivot={[0, -0.5, -0.5]}
        color="#d19807"
      >
        <Leg name="rightBack" ref={rightBackRef} parentPivot={[0.4, 0, 0.5]} />
        <Leg
          name="rightFront"
          ref={rightFrontRef}
          parentPivot={[-0.45, 0, 0.5]}
        />

        <Leg
          name="leftBack"
          ref={leftBackRef}
          parentPivot={[0.4, 0, -0.5]}
          pivot={[0, 0.5, 0.6]}
        />
        <Leg
          name="leftFront"
          ref={leftFrontRef}
          parentPivot={[-0.45, 0, -0.5]}
          pivot={[0, 0.5, 0.6]}
        />
      </ConstraintPart>
    </group>
  );
});

export default Robot;
