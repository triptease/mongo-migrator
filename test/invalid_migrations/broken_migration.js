module.exports = {
  apply: async database => {
    const fooCollection = database.collection('test1');
    fooCollection.insert({ foo: 'bar' });
  },
};
