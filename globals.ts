import { Triplet } from "@react-three/cannon"

export const normalizeSize = ([px = 0, py = 0, pz = 0]) => ([ox = 1, oy = 1, oz = 1]):Triplet => [px * ox, py * oy, pz * oz]
export const GROUP_GROUND = 2 ** 0
export const GROUP_BODY = 2 ** 1