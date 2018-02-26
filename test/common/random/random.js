const randoms = {
  integer: (max = 1000000000) => Math.floor(Math.random() * max),
  string: (prefix = 'string') => `${prefix}-${randoms.integer()}`,
  date: () => new Date(randoms.integer()),
  url: () => `http://${randoms.string()}.com/${randoms.string()}`,
  oneOf: () => arguments[randoms.integer(arguments.length)],
  boolean: () => randoms.integer(1) === 1,
  id: () => Math.floor(Math.random()*16777215*16777215*16777215*16777215).toString(16)
};

module.exports = randoms;
