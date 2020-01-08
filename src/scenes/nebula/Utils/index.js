export const ANGLE_OF_THRUST = 10;
export const NUMBER_OF_VECTORS = 6;
export const VECTORS_FREE_SPACE_AROUND = 2;
export const VECTOR_SIZE_RANGE = {
  length: [12, 32],
  amplitude: [2, 5],
};

export function random (min, max, integer = true) {
  if (integer) {return Math.floor((Math.random() * max) + min);}
  return (Math.random() * max) + min;
}

export function sum (args) {
  let val = 0;

  for (let i = 0; i < args.length; i++) {
    val += args[i];
  }

  return val;
}
