function getRandomElement(array) {
    return array[Math.floor(Math.random()*array.length)];
}

//returns random int in [0, stop)
function getRandomIntInRange(stop) {
    return Math.floor(Math.random()*stop)
}

function ID() {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(36).substr(2, 9);
};

export default {
    getRandomElement,
    getRandomIntInRange,
    ID
}
