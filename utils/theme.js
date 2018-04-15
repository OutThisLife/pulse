// @flow
export default {
  text: '#FFF',
  link: '#72A044',
  bg: '#1B1F22',

  scale: (min: number, max: number): string => `calc(${min}px + (${max} - ${min}) * (100vw - 400px) / 1600)`
};
