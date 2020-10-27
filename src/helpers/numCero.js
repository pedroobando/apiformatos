const numCero = (value, length) => {
  return value.replace(/^\s*0+/, ({ length }) => ' '.repeat(length));
};

module.exports = {
  numCero,
};
