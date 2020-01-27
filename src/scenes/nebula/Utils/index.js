export const ANGLE_OF_THRUST = 15;
export const NUMBER_OF_THRUST_LINES = 4;
export const THRUST_LINE = {
  height: [2, 3],
  length: [36, 48],
  radius: [18, 24],
  colors: {
    '0': '#9FFFE0',
    '1': '#FF5983',
    '2': '#EE98FB',
    '3': '#FFFFB3',
    '4': '#8F9BFF',
    '5': '#5DF2D6',
    '6': '#FFB2FF',
    '7': '#C60055',
    '8': '#FFFF00',
    '9': '#5C007A',
    '10': '#84FFFF',
    '11': '#6D4C41',
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
