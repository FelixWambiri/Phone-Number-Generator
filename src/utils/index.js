function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return `07${Math.floor(Math.random() * (max - min + 1)) + min}`.substring(
    0,
    10
  );
}

export function generateRandom(qty = 10) {
  let arr = [],
    min = 1000000000,
    max = 9999999999,
    i = 0,
    randomNumber;

  while (i < qty) {
    randomNumber = getRandomInt(min, max);
    if (arr.indexOf(randomNumber) === -1) {
      arr.push(randomNumber);
      i += 1;
    }
  }
  return arr;
}

export function sortArrays(arr, order) {
  if (order === "ascending") return arr.sort((a, b) => a - b);
  return arr.sort((a, b) => b - a);
}

export function findMax(arr) {
  return Math.max.apply(null, arr);
}

export function findMin(arr) {
  return Math.min.apply(null, arr);
}
