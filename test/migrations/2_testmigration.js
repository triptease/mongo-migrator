module.exports = {
  apply: async database => {
    const fooCollection = database.collection('test2');
    fooCollection.insert({ foo: 'baz' });
  },
};
