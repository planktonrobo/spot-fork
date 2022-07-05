import { Triplet, useBox, useHingeConstraint } from "@react-three/cannon";
import {
  forwardRef,
  useContext,
  useLayoutEffect,
  MutableRefObject,
  useEffect,
} from "react";
import { Object3D } from "three";
import context from "../context/robot";
import { normalizeSize, GROUP_BODY, GROUP_GROUND } from "../globals";
import BoxShape from "./BoxShape";
type Props = {
  config?: object;
  enableMotor?: boolean;
  motorSpeed?: number;
  motorMaxForce: number;
  color: string;
  name?: string;
  children?: React.ReactNode;
  pivot?: Triplet;
  parentPivot?: Triplet;
  args: Triplet;
};

const ConstraintPart = forwardRef<
  MutableRefObject<Object3D<Event>> | undefined,
  Props
>(
  (
    {
      config = {},
      enableMotor,
      motorSpeed = 1,
      motorMaxForce = 1,
      color,
      children,
      name,
      pivot = [0, 0, 0],
      parentPivot = [0, 0, 0],
      ...props
    },
    ref
  ) => {
    const parent = useContext(context);

    const normParentPivot = parent
      ? normalizeSize(parent[1].args)
      : () => undefined;
    const normPivot = props.args ? normalizeSize(props.args) : () => undefined;

    const [bodyRef] = useBox(() => ({
      collisionFilterGroup: GROUP_BODY,
      collisionFilterMask: GROUP_GROUND | GROUP_BODY,
      linearDamping: 0.4, // Linear Damping controls how much the Physics Body or Constraint resists translation
      mass: 1,
      ...props,
    }));

    const [, , hingeApi] = useHingeConstraint(
      bodyRef,
      parent ? parent[0] : null,
      {
        axisA: [0, 0, 1],
        axisB: [0, 0, 1],
        pivotA: normPivot(pivot),
        pivotB: normParentPivot(parentPivot),
        ...config,
      }
    );

    useLayoutEffect(() => {
      if (bodyRef && bodyRef.current) {
        console.log("setting!");
        bodyRef.current.hingeApi = hingeApi;
      }
    });

    useEffect(
      () => void hingeApi[(enableMotor ? "enable" : "disable") + "Motor"](),
      [enableMotor]
    ); // void makes arrow functions return nothing
    useEffect(() => void hingeApi.setMotorSpeed(motorSpeed), [motorSpeed]);
    useEffect(
      () => void hingeApi.setMotorMaxForce(motorMaxForce),
      [motorMaxForce]
    );

    return (
      <context.Provider value={[bodyRef, props]}>
        <BoxShape ref={bodyRef} {...props} color={color} />
        {children}
      </context.Provider>
    );
  }
);

export default ConstraintPart;
