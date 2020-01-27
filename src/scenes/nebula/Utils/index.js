export const ANGLE_OF_THRUST = 15;
export const NUMBER_OF_THRUST_LINES = 4;
export const THRUST_LINE = {
  height: [2, 3],
  length: [30, 48],
  radius: [16, 24],
  colors: {
    '0': ['#9FFFE0', false],
    '1': ['#FF5983', false],
    '2': ['#FFFFB3', false],
    '3': ['#8F9BFF', false],
    '4': ['#C60055', false],
    '5': ['#5C007A', false],
    '6': ['#6D4C41', false],
  },

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
