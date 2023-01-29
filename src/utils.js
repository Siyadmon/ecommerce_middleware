export const uniqueArray = (input) =>
  input.filter((item, i, ar) => ar.indexOf(item) === i);
